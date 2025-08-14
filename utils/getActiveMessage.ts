import { ChatMessage } from '@/types';

export const getActiveMessage = (
  currentTimeMs: number,
  messages: ChatMessage[],
): ChatMessage | undefined => {
  return messages?.find(msg => {
    return msg.endTime > currentTimeMs && msg.startTime <= currentTimeMs;
  });
};

export const getActiveMessageIndex = (
  currentTimeMs: number,
  messages: ChatMessage[],
): number | undefined => {
  const index = messages?.findIndex(msg => {
    return msg.endTime > currentTimeMs && msg.startTime <= currentTimeMs;
  });

  return index === -1 ? messages.length - 1 : index;
};
