import { useEffect, useState } from "react";
import { audioApi } from "@/api/audioApi";
import { ChatMessage } from "@/types/index";
import { formatMessages } from "@/feature/chat-transcript/ChatTranscript.utils";

export const useData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[] | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setError("");
        setIsLoading(true);

        const [audioRes, audioTranscriptRes] = await Promise.all([
          audioApi.getAudio(),
          audioApi.getAudioTranscript(),
        ]);

        const pause = audioTranscriptRes.pause;

        const formattedMessages: ChatMessage[] = formatMessages(
          pause,
          audioTranscriptRes.speakers,
        );

        setChatMessages(formattedMessages);
      } catch (e) {
        setError("Unable to parse messages");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return {
    isLoading,
    error,
    chatMessages,
  };
};
