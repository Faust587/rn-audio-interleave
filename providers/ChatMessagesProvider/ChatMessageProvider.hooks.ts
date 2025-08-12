import { useContext } from "react";
import { ChatMessageContext } from "./ChatMessageProvider.context";

export const useChatMessages = () => {
  const context = useContext(ChatMessageContext);
  if (!context)
    throw new Error("useChatMessages must be used inside ChatMessageProvider");
  return context;
};
