import { ChatMessage } from "@/types/index";

export const getActiveMessage = (
  currentTimeMs: number,
  messages: ChatMessage[],
): ChatMessage | undefined => {
  return messages?.find((msg) => {
    return msg.endTime > currentTimeMs && msg.startTime <= currentTimeMs;
  });
};

export const getActiveMessageIndex = (
  currentTimeMs: number,
  messages: ChatMessage[],
): number | undefined => {
  return messages?.findIndex((msg) => {
    return msg.endTime > currentTimeMs && msg.startTime <= currentTimeMs;
  });
};
