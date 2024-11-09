// store/chatStore.ts
import { create } from 'zustand';

export interface Message {
  _id: string;
  text: string;
  createdAt: Date;
  user: {
    _id: string;
    name: string;
    avatar?: string;
  };
}

interface ChatState {
  messages: Message[];
  role: 'admin' | 'user';
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  role: 'user', // Устанавливаем роль по умолчанию
  setMessages: (messages) => set({ messages }),
  addMessage: (message) =>
    set((state) => ({ messages: [message, ...state.messages] })),
}));
