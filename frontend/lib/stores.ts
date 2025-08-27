import { create } from "zustand";

interface UiState {
  isUploading: boolean;
  selectedActorId: string | null;
  setIsUploading: (uploading: boolean) => void;
  setSelectedActorId: (id: string | null) => void;
}

export const useUiStore = create<UiState>((set) => ({
  isUploading: false,
  selectedActorId: null,
  setIsUploading: (uploading) => set({ isUploading: uploading }),
  setSelectedActorId: (id) => set({ selectedActorId: id }),
}));
