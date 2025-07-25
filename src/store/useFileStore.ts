import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
interface FileState {
  // DB REQUEST
  name: string;
  fileAlias: string;
  fileDesc: string;

  // file upload
  selectedFile: File | null;
  setSelectedFile: (file: File) => void;
  clearSelectedFile: () => void;

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
  selectedFile: null,
  isUploading: false,

  createFile: (fileAlias: string) => {
    set({ name: uuidv4(), fileAlias, fileDesc: "" });
  },
  setDescription: (description: string) => set({ fileDesc: description }),

  clearSelectedFile: () => set({ selectedFile: null }),
  setSelectedFile: (file: File) => set({ selectedFile: file }),

  setIsUploading: (isUploading: boolean) => set({ isUploading })
}));
