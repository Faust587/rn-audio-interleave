import { FC } from "react";
import { useData } from "@/feature/chat-transcript/hooks";
import { Text } from "react-native";
import { ChatTranscriptComponent } from "@/feature/chat-transcript/ChatTranscript.component";

export const ChatTranscriptContainer: FC = () => {
  const { isLoading, error, chatMessages } = useData();

  if (isLoading) return <Text>Loading...</Text>;

  if (error) return <Text>{error}</Text>;

  if (chatMessages === null) return <Text>No messages</Text>;

  return <ChatTranscriptComponent chatMessages={chatMessages} />;
};
