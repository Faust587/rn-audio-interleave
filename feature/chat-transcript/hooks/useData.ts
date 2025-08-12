import { useEffect } from "react";
import { useChatMessages } from "@/providers/ChatMessagesProvider";

export const useData = () => {
  const { chatMessages, fetchChatMessages, error, isLoading } =
    useChatMessages();

  useEffect(() => {
    fetchChatMessages();
  }, [fetchChatMessages]);

  return {
    isLoading,
    error,
    chatMessages,
  };
};
