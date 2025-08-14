import { createContext } from 'react';

import { ChatMessage } from '@/types';

export type ChatMessageContextType = {
  chatMessages: ChatMessage[] | null;
  isLoading: boolean;
  error: string | null;
  fetchChatMessages: () => void;
  pauseMs: number | null;
};

export const ChatMessageContext = createContext<ChatMessageContextType | null>(
  null,
);
