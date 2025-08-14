import { useEffect, useMemo, useRef } from 'react';

import {
  AUDIO_SLOWED_RATE,
  DEBOUNCE_DIFF_RATE_MS,
  DEFAULT_AUDIO_RATE,
} from '@/const/player';
import { useAudioPlayer } from '@/providers/AudioPlayerProvider';
import { useChatMessages } from '@/providers/ChatMessagesProvider';
import { getActiveMessageIndex } from '@/utils/getActiveMessage';
import { isNumber } from '@/utils/index';

export const useAudioControllers = () => {
  const slowedMsg = useRef<number>(null);

  const {
    play,
    isPlaying,
    pause,
    seek,
    currentTimeMs,
    durationMs,
    setAudioRate,
  } = useAudioPlayer();
  const { chatMessages, pauseMs } = useChatMessages();

  const activeMsgIndex = useMemo(() => {
    if (!chatMessages) return null;
    return getActiveMessageIndex(currentTimeMs, chatMessages);
  }, [chatMessages, currentTimeMs]);

  const handleNextMsg = () => {
    if (!chatMessages || !isNumber(activeMsgIndex)) return;
    const startTimeMs = chatMessages[activeMsgIndex + 1].startTime;
    seek(startTimeMs);
  };

  useEffect(() => {
    if (slowedMsg.current === null) return;

    // If active message changed and it's not the slowed message, reset to normal rate
    if (activeMsgIndex !== slowedMsg.current) {
      setAudioRate(DEFAULT_AUDIO_RATE).then(() => (slowedMsg.current = null));
    }

    // Additional check: if we're within the slowed message but close to its end
    if (
      isNumber(activeMsgIndex) &&
      activeMsgIndex === slowedMsg.current &&
      chatMessages &&
      chatMessages[activeMsgIndex]
    ) {
      const currentMsg = chatMessages[activeMsgIndex];
      const timeUntilEnd = currentMsg.endTime - currentTimeMs;

      // If time until message end is less than pauseMs, return to normal rate
      if (pauseMs && timeUntilEnd <= pauseMs) {
        setAudioRate(DEFAULT_AUDIO_RATE).then(() => (slowedMsg.current = null));
      }
    }
  }, [activeMsgIndex, setAudioRate, chatMessages, currentTimeMs, pauseMs]);

  const handlePrevMsg = () => {
    if (!isNumber(activeMsgIndex) || !chatMessages) return;

    const isGoBack =
      currentTimeMs - chatMessages[activeMsgIndex].startTime <
      DEBOUNCE_DIFF_RATE_MS;

    if (!isGoBack) {
      seek(chatMessages[activeMsgIndex].startTime);
      play();
      return;
    }

    const prevMsg = chatMessages[activeMsgIndex - 1];
    if (!prevMsg) return;
    seek(prevMsg.startTime);
    play();
  };

  const handleRepeatLastMsg = async () => {
    if (!activeMsgIndex || !chatMessages) return;
    await setAudioRate(AUDIO_SLOWED_RATE);

    const prevMsg = chatMessages[activeMsgIndex - 1];
    if (!prevMsg) {
      await seek(chatMessages[activeMsgIndex].startTime);
      slowedMsg.current = activeMsgIndex;
      return;
    }
    slowedMsg.current = activeMsgIndex - 1;
    await seek(prevMsg.startTime);
  };

  return {
    play,
    pause,
    seek,
    isPlaying,
    currentTimeMs,
    durationMs,
    handleNextMsg,
    handlePrevMsg,
    handleRepeatLastMsg,
  };
};
