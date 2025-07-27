import { create } from "zustand";

interface WritingStudioState {
  content: string;
  setContent: (content: string) => void;
  applyContent: (content: string) => void;

  selectedSentence: string;
  setSelectedSentence: (sentence: string) => void;
}

export const useWritingStudioStore = create<WritingStudioState>((set) => ({
  content: "",
  setContent: (content: string) => set({ content }),
  applyContent: (content: string) => set({ content }),

  selectedSentence: "",
  setSelectedSentence: (sentence: string) => set({ selectedSentence: sentence }),
}));
