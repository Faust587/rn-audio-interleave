import { createContext } from "react";
import { ChatMessage } from "@/types/index";

export type ChatMessageContextType = {
  chatMessages: ChatMessage[] | null;
  isLoading: boolean;
  error: string | null;
  fetchChatMessages: () => void;
};

export const ChatMessageContext = createContext<ChatMessageContextType | null>(
  null,
);
