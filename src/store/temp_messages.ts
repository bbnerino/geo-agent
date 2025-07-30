import { Message } from "@/types/chatting";
import { create } from "zustand";
import { MessageState } from "./messages";

export const useTempMessageStore = create<MessageState>((set) => ({
  messages: [],
  setMessages: (messages: Message[]) => set({ messages }),
  pushUserMessage: (message: string, author?: string) =>
    set((state) => ({ messages: [...state.messages, new Message(message, "user", author)] })),
  pushAssistantMessage: (message: string, author?: string) =>
    set((state) => ({ messages: [...state.messages, new Message(message, "assistant", author)] })),
  pushToolMessage: (message: string, author?: string) =>
    set((state) => ({ messages: [...state.messages, new Message(message, "tool", author)] }))
}));
