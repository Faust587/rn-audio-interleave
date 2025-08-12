import { FC, PropsWithChildren, useCallback, useMemo, useState } from "react";
import { ChatMessageContext } from "./ChatMessageProvider.context";
import { ChatMessage } from "@/types";
import { useAudioPlayer } from "@/providers/AudioPlayerProvider/AudioPlayerProvider.hooks";
import { audioApi } from "@/api/audioApi";
import { formatMessages } from "@/feature/chat-transcript/ChatTranscript.utils";

export const ChatMessageProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[] | null>(null);

  const { load } = useAudioPlayer();

  const fetchChatMessages = useCallback(async () => {
    try {
      setError("");
      setIsLoading(true);

      const [audioRes, audioTranscriptRes] = await Promise.all([
        audioApi.getAudio(),
        audioApi.getAudioTranscript(),
      ]);
      await load(audioRes);
      const pause = audioTranscriptRes.pause;

      const formattedMessages: ChatMessage[] = formatMessages(
        pause,
        audioTranscriptRes.speakers,
      );

      setChatMessages(formattedMessages);
    } catch (e) {
      console.error(e);
      setError("Unable to parse messages");
    } finally {
      setIsLoading(false);
    }
  }, [load]);

  const value = useMemo(
    () => ({
      isLoading,
      error,
      chatMessages,
      fetchChatMessages,
    }),
    [error, isLoading, chatMessages, fetchChatMessages],
  );

  return (
    <ChatMessageContext.Provider value={value}>
      {children}
    </ChatMessageContext.Provider>
  );
};
