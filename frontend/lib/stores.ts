import { create } from "zustand";
import { IdentifiedActor } from "./schemas";

interface RecogniserState {
  isUploading: boolean;
  selectedActorId: string | null;
  identifiedActors: IdentifiedActor[] | null;
  setIsUploading: (uploading: boolean) => void;
  setSelectedActorId: (id: string | null) => void;
  setIdentifiedActors: (actors: IdentifiedActor[] | null) => void;
}

export const useRecogniserStore = create<RecogniserState>((set) => ({
  isUploading: false,
  selectedActorId: null,
  identifiedActors: null,

  setIsUploading: (uploading) => set({ isUploading: uploading }),
  setSelectedActorId: (id) => set({ selectedActorId: id }),
  setIdentifiedActors: (actors) => set({ identifiedActors: actors }),
}));
