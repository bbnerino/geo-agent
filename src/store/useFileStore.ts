import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
interface FileState {
  // DB REQUEST
  name: string;
  fileAlias: string;
  fileDesc: string;

  // file upload
  file: File | null;
  setFile: (file: File) => void;
  clearFile: () => void;

  setDescription: (description: string) => void;
  createFile: (fileName: string) => void;
  // file upload
  isUploading: boolean;
  setIsUploading: (isUploading: boolean) => void;
}

export const useFileStore = create<FileState>((set) => ({
  // 초기 상태

  name: "",
  fileAlias: "",
  fileDesc: "",
  file: null,
  isUploading: false,

  createFile: (fileAlias: string) => {
    set({ name: uuidv4(), fileAlias, fileDesc: "" });
  },
  setDescription: (description: string) => set({ fileDesc: description }),

  clearFile: () => set({ file: null }),
  setFile: (file: File) => set({ file }),

  setIsUploading: (isUploading: boolean) => set({ isUploading })
}));
