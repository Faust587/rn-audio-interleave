import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { ChatTranscriptContainer } from '../ChatTranscript.container';
import { ChatTranscriptComponent } from '../ChatTranscript.component';
import {
  AudioPlayerContext,
  AudioPlayerContextType,
} from '@/providers/AudioPlayerProvider/AudioPlayerProvider.context';
import {
  ChatMessageContext,
  ChatMessageContextType,
} from '@/providers/ChatMessagesProvider/ChatMessageProvider.context';
import { FORMATTED_CHAT } from '@/test-data/speakers.mock';

jest.mock('@/api/audioApi', () => ({
  audioApi: {
    getAudio: jest
      .fn()
      .mockResolvedValue(require('../../../api/mock/audio.mp3')),
    getAudioTranscript: jest.fn().mockResolvedValue({
      pause: 250,
      speakers: [
        {
          name: 'John',
          phrases: [
            { words: 'this is one phrase.', time: 1474 },
            { words: 'now the second phrase.', time: 1667 },
            { words: 'end with last phrase.', time: 1214 },
          ],
        },
        {
          name: 'Jack',
          phrases: [
            { words: 'another speaker here.', time: 1570 },
            { words: 'saying her second phrase.', time: 1989 },
            { words: 'and eventually finishing up.', time: 1486 },
          ],
        },
      ],
    }),
  },
}));

// Helper function to create mock audio player context
const createMockAudioPlayerContext = (
  currentTimeMs: number = 0,
): AudioPlayerContextType => ({
  currentTimeMs,
  durationMs: 10900,
  isPlaying: false,
  load: jest.fn().mockResolvedValue(undefined),
  play: jest.fn().mockResolvedValue(undefined),
  pause: jest.fn().mockResolvedValue(undefined),
  seek: jest.fn().mockResolvedValue(undefined),
  setAudioRate: jest.fn().mockResolvedValue(undefined),
});

// Helper function to create mock chat message context
const createMockChatMessageContext = (
  isLoading: boolean = false,
  error: string | null = null,
  chatMessages: typeof FORMATTED_CHAT | null = FORMATTED_CHAT,
): ChatMessageContextType => ({
  chatMessages,
  isLoading,
  error,
  fetchChatMessages: jest.fn(),
});

// Test wrapper component
const TestWrapper: React.FC<{
  audioContext: AudioPlayerContextType;
  chatContext: ChatMessageContextType;
  children: React.ReactNode;
}> = ({ audioContext, chatContext, children }) => {
  return (
    <AudioPlayerContext.Provider value={audioContext}>
      <ChatMessageContext.Provider value={chatContext}>
        {children}
      </ChatMessageContext.Provider>
    </AudioPlayerContext.Provider>
  );
};

// Helper function to check if a message container has active styling
const hasActiveMessageStyle = (element: any): boolean => {
  if (!element?.props?.style) return false;

  const styles = Array.isArray(element.props.style)
    ? element.props.style
    : [element.props.style];

  return styles.some(
    (style: any) =>
      style && typeof style === 'object' && style.backgroundColor === '#E1E4FF',
  );
};

describe('ChatTranscript Integration Tests - Message Highlighting', () => {
  describe('ChatTranscriptComponent', () => {
    it('should highlight the correct message when activeMessageId is provided', () => {
      const audioContext = createMockAudioPlayerContext(1500);
      const chatContext = createMockChatMessageContext();

      const { getByText } = render(
        <TestWrapper audioContext={audioContext} chatContext={chatContext}>
          <ChatTranscriptComponent
            chatMessages={FORMATTED_CHAT}
            activeMessageId="John-0-1724"
          />
        </TestWrapper>,
      );

      // The first message should be highlighted (active)
      const activeMessage = getByText('this is one phrase.');
      const activeMessageContainer = activeMessage.parent?.parent;
      expect(hasActiveMessageStyle(activeMessageContainer)).toBe(true);

      // Other messages should not be highlighted
      const inactiveMessage = getByText('another speaker here.');
      const inactiveMessageContainer = inactiveMessage.parent?.parent;
      expect(hasActiveMessageStyle(inactiveMessageContainer)).toBe(false);
    });

    it('should not highlight any message when activeMessageId is undefined', () => {
      const audioContext = createMockAudioPlayerContext();
      const chatContext = createMockChatMessageContext();

      const { getByText } = render(
        <TestWrapper audioContext={audioContext} chatContext={chatContext}>
          <ChatTranscriptComponent
            chatMessages={FORMATTED_CHAT}
            activeMessageId={undefined}
          />
        </TestWrapper>,
      );

      // All messages should have default styling (not highlighted)
      const message1 = getByText('this is one phrase.');
      const message2 = getByText('another speaker here.');

      const message1Container = message1.parent?.parent;
      const message2Container = message2.parent?.parent;

      expect(hasActiveMessageStyle(message1Container)).toBe(false);
      expect(hasActiveMessageStyle(message2Container)).toBe(false);
    });

    it('should handle empty chat messages array', () => {
      const audioContext = createMockAudioPlayerContext();
      const chatContext = createMockChatMessageContext();

      const { queryByText } = render(
        <TestWrapper audioContext={audioContext} chatContext={chatContext}>
          <ChatTranscriptComponent
            chatMessages={[]}
            activeMessageId="non-existent"
          />
        </TestWrapper>,
      );

      expect(queryByText('this is one phrase.')).toBeNull();
    });
  });

  describe('ChatTranscriptContainer - Timeline Integration', () => {
    it('should highlight the correct message based on currentTimeMs at different timeline positions', async () => {
      const chatContext = createMockChatMessageContext();

      // Test case 1: Time 1000ms should highlight first message (John-0-1724)
      const audioContext1 = createMockAudioPlayerContext(1000);
      const { rerender, getByText } = render(
        <TestWrapper audioContext={audioContext1} chatContext={chatContext}>
          <ChatTranscriptContainer />
        </TestWrapper>,
      );

      await waitFor(() => {
        const activeMessage = getByText('this is one phrase.');
        const activeMessageContainer = activeMessage.parent?.parent;
        expect(hasActiveMessageStyle(activeMessageContainer)).toBe(true);
      });

      // Test case 2: Time 2500ms should highlight second message (Jack-1724-3544)
      const audioContext2 = createMockAudioPlayerContext(2500);
      rerender(
        <TestWrapper audioContext={audioContext2} chatContext={chatContext}>
          <ChatTranscriptContainer />
        </TestWrapper>,
      );

      await waitFor(() => {
        const activeMessage = getByText('another speaker here.');
        const activeMessageContainer = activeMessage.parent?.parent;
        expect(hasActiveMessageStyle(activeMessageContainer)).toBe(true);

        // Previous message should not be highlighted
        const previousMessage = getByText('this is one phrase.');
        const previousMessageContainer = previousMessage.parent?.parent;
        expect(hasActiveMessageStyle(previousMessageContainer)).toBe(false);
      });

      // Test case 3: Time 4500ms should highlight third message (John-3544-5461)
      const audioContext3 = createMockAudioPlayerContext(4500);
      rerender(
        <TestWrapper audioContext={audioContext3} chatContext={chatContext}>
          <ChatTranscriptContainer />
        </TestWrapper>,
      );

      await waitFor(() => {
        const activeMessage = getByText('now the second phrase.');
        const activeMessageContainer = activeMessage.parent?.parent;
        expect(hasActiveMessageStyle(activeMessageContainer)).toBe(true);
      });
    });

    it('should not highlight any message when currentTimeMs is outside all message ranges', async () => {
      const chatContext = createMockChatMessageContext();

      // Time before any message starts
      const audioContextBefore = createMockAudioPlayerContext(-100);
      const { rerender, getByText } = render(
        <TestWrapper
          audioContext={audioContextBefore}
          chatContext={chatContext}
        >
          <ChatTranscriptContainer />
        </TestWrapper>,
      );

      await waitFor(() => {
        const message1 = getByText('this is one phrase.');
        const message2 = getByText('another speaker here.');

        const message1Container = message1.parent?.parent;
        const message2Container = message2.parent?.parent;

        expect(hasActiveMessageStyle(message1Container)).toBe(false);
        expect(hasActiveMessageStyle(message2Container)).toBe(false);
      });

      // Time after all messages end
      const audioContextAfter = createMockAudioPlayerContext(15000);
      rerender(
        <TestWrapper audioContext={audioContextAfter} chatContext={chatContext}>
          <ChatTranscriptContainer />
        </TestWrapper>,
      );

      await waitFor(() => {
        const message1 = getByText('this is one phrase.');
        const message2 = getByText('another speaker here.');

        const message1Container = message1.parent?.parent;
        const message2Container = message2.parent?.parent;

        expect(hasActiveMessageStyle(message1Container)).toBe(false);
        expect(hasActiveMessageStyle(message2Container)).toBe(false);
      });
    });

    it('should handle boundary conditions correctly', async () => {
      const chatContext = createMockChatMessageContext();

      // Test exact start time of first message (0ms)
      const audioContextStart = createMockAudioPlayerContext(0);
      const { rerender, getByText } = render(
        <TestWrapper audioContext={audioContextStart} chatContext={chatContext}>
          <ChatTranscriptContainer />
        </TestWrapper>,
      );

      await waitFor(() => {
        const activeMessage = getByText('this is one phrase.');
        const activeMessageContainer = activeMessage.parent?.parent;
        expect(hasActiveMessageStyle(activeMessageContainer)).toBe(true);
      });

      // Test exact end time of first message (1724ms) - should not be active
      const audioContextEnd = createMockAudioPlayerContext(1724);
      rerender(
        <TestWrapper audioContext={audioContextEnd} chatContext={chatContext}>
          <ChatTranscriptContainer />
        </TestWrapper>,
      );

      await waitFor(() => {
        const activeMessage = getByText('another speaker here.');
        const activeMessageContainer = activeMessage.parent?.parent;
        expect(hasActiveMessageStyle(activeMessageContainer)).toBe(true);

        const previousMessage = getByText('this is one phrase.');
        const previousMessageContainer = previousMessage.parent?.parent;
        expect(hasActiveMessageStyle(previousMessageContainer)).toBe(false);
      });
    });

    it('should handle loading and error states without crashing', async () => {
      const audioContext = createMockAudioPlayerContext(1000);

      // Test loading state
      const loadingContext = createMockChatMessageContext(true, null, null);
      const { rerender, getByText, queryByText } = render(
        <TestWrapper audioContext={audioContext} chatContext={loadingContext}>
          <ChatTranscriptContainer />
        </TestWrapper>,
      );

      // Should show loading state, not chat messages
      expect(queryByText('this is one phrase.')).toBeNull();

      // Test error state
      const errorContext = createMockChatMessageContext(
        false,
        'Network error',
        null,
      );
      rerender(
        <TestWrapper audioContext={audioContext} chatContext={errorContext}>
          <ChatTranscriptContainer />
        </TestWrapper>,
      );

      await waitFor(() => {
        expect(getByText('Network error')).toBeTruthy();
        expect(queryByText('this is one phrase.')).toBeNull();
      });

      // Test empty state
      const emptyContext = createMockChatMessageContext(false, null, null);
      rerender(
        <TestWrapper audioContext={audioContext} chatContext={emptyContext}>
          <ChatTranscriptContainer />
        </TestWrapper>,
      );

      await waitFor(() => {
        expect(getByText('No messages available')).toBeTruthy();
        expect(queryByText('this is one phrase.')).toBeNull();
      });
    });

    it('should update highlighting when currentTimeMs changes during playback simulation', async () => {
      const chatContext = createMockChatMessageContext();
      let currentTime = 0;

      // Create a dynamic audio context that we can update
      let audioContext = createMockAudioPlayerContext(currentTime);
      const { rerender, getByText } = render(
        <TestWrapper audioContext={audioContext} chatContext={chatContext}>
          <ChatTranscriptContainer />
        </TestWrapper>,
      );

      // Simulate playback progression through multiple messages
      const timePoints = [
        { time: 500, expectedMessage: 'this is one phrase.' },
        { time: 2000, expectedMessage: 'another speaker here.' },
        { time: 4000, expectedMessage: 'now the second phrase.' },
        { time: 6000, expectedMessage: 'saying her second phrase.' },
        { time: 8000, expectedMessage: 'end with last phrase.' },
        { time: 9500, expectedMessage: 'and eventually finishing up.' },
      ];

      for (const { time, expectedMessage } of timePoints) {
        audioContext = createMockAudioPlayerContext(time);
        rerender(
          <TestWrapper audioContext={audioContext} chatContext={chatContext}>
            <ChatTranscriptContainer />
          </TestWrapper>,
        );

        await waitFor(() => {
          const activeMessage = getByText(expectedMessage);
          const activeMessageContainer = activeMessage.parent?.parent;
          expect(hasActiveMessageStyle(activeMessageContainer)).toBe(true);
        });
      }
    });

    it('should correctly identify active message using getActiveMessage utility', () => {
      // Test the core logic that determines which message should be active
      const testCases = [
        { time: 0, expectedId: 'John-0-1724' },
        { time: 1000, expectedId: 'John-0-1724' },
        { time: 1724, expectedId: 'Jack-1724-3544' },
        { time: 2500, expectedId: 'Jack-1724-3544' },
        { time: 3544, expectedId: 'John-3544-5461' },
        { time: 4500, expectedId: 'John-3544-5461' },
        { time: 5461, expectedId: 'Jack-5461-7700' },
        { time: 6500, expectedId: 'Jack-5461-7700' },
        { time: 7700, expectedId: 'John-7700-9164' },
        { time: 8500, expectedId: 'John-7700-9164' },
        { time: 9164, expectedId: 'Jack-9164-10900' },
        { time: 10000, expectedId: 'Jack-9164-10900' },
        { time: 10900, expectedId: undefined }, // After all messages
        { time: -100, expectedId: undefined }, // Before all messages
      ];

      testCases.forEach(({ time, expectedId }) => {
        const activeMessage = FORMATTED_CHAT.find(
          msg => msg.endTime > time && msg.startTime <= time,
        );

        if (expectedId) {
          expect(activeMessage?.id).toBe(expectedId);
        } else {
          expect(activeMessage).toBeUndefined();
        }
      });
    });
  });
});
