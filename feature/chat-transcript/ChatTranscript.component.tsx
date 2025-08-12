import { FC } from "react";
import { ChatMessage } from "@/types";
import { ChatList } from "@/feature/chat-transcript/components";

type ChatTranscriptComponentProps = {
  chatMessages: ChatMessage[];
};

export const ChatTranscriptComponent: FC<ChatTranscriptComponentProps> = ({
  chatMessages,
}) => {
  return <ChatList list={chatMessages} />;
};
