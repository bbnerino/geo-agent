import { Message } from "@/types/chatting";
import { create } from "zustand";

interface MessageState {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  pushUserMessage: (message: string, author?: string) => void;
  pushAssistantMessage: (message: string, author?: string) => void;
}

export const useMessageStore = create<MessageState>((set) => ({
  messages: [],
  setMessages: (messages: Message[]) => set({ messages }),
  pushUserMessage: (message: string, author?: string) =>
    set((state) => ({ messages: [...state.messages, new Message(message, "user", author)] })),
  pushAssistantMessage: (message: string, author?: string) =>
    set((state) => ({ messages: [...state.messages, new Message(message, "assistant", author)] })),
}));
