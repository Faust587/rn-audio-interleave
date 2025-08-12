import { FC, useMemo } from "react";
import { useData } from "@/feature/chat-transcript/hooks";
import { Text } from "react-native";
import { ChatTranscriptComponent } from "@/feature/chat-transcript/ChatTranscript.component";
import { useAudioPlayer } from "@/providers/AudioPlayerProvider/AudioPlayerProvider.hooks";
import { getActiveMessage } from "@/utils/getActiveMessage";

export const ChatTranscriptContainer: FC = () => {
  const { isLoading, error, chatMessages } = useData();

  const { currentTimeMs } = useAudioPlayer();

  const activeMessageId = useMemo(() => {
    if (!chatMessages) return;
    return getActiveMessage(currentTimeMs, chatMessages)?.id;
  }, [chatMessages, currentTimeMs]);

  if (isLoading) return <Text>Loading...</Text>;

  if (error) return <Text>{error}</Text>;

  if (chatMessages === null) return <Text>No messages</Text>;

  return (
    <ChatTranscriptComponent
      activeMessageId={activeMessageId}
      chatMessages={chatMessages}
    />
  );
};
