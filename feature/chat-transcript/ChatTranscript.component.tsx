import { FC } from "react";
import { ChatMessage } from "@/types";
import { ChatList } from "@/feature/chat-transcript/components";

type ChatTranscriptComponentProps = {
  chatMessages: ChatMessage[];
  activeMessageId?: string;
};

export const ChatTranscriptComponent: FC<ChatTranscriptComponentProps> = ({
  chatMessages,
  activeMessageId,
}) => {
  return <ChatList activeMessageId={activeMessageId} list={chatMessages} />;
};
