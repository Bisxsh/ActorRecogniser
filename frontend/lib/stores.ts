import { create } from "zustand";
import { FilterType, IdentifiedActor, Media, SortType } from "./schemas";

interface RecogniserState {
  isUploading: boolean;
  selectedActorId: string | null;
  identifiedActors: IdentifiedActor[] | null;
  setIsUploading: (uploading: boolean) => void;
  setSelectedActorId: (id: string | null) => void;
  setIdentifiedActors: (actors: IdentifiedActor[] | null) => void;

  activeFilter: FilterType;
  setActiveFilter: (filter: FilterType) => void;
  activeSort: SortType;
  setActiveSort: (sort: SortType) => void;

  allMedia: Media[];
  setAllMedia: (media: Media[]) => void;
  filteredMedia: Media[];
  setFilteredMedia: (media: Media[]) => void;
}

export const useRecogniserStore = create<RecogniserState>((set) => ({
  isUploading: false,
  selectedActorId: null,
  identifiedActors: null,

  setIsUploading: (uploading) => set({ isUploading: uploading }),
  setSelectedActorId: (id) => set({ selectedActorId: id }),
  setIdentifiedActors: (actors) => set({ identifiedActors: actors }),

  activeFilter: FilterType.ALL,
  setActiveFilter: (filter) => set({ activeFilter: filter }),
  activeSort: SortType.RELEVANCE,
  setActiveSort: (sort) => set({ activeSort: sort }),
  allMedia: [],
  setAllMedia: (media) => set({ allMedia: media }),
  filteredMedia: [],
  setFilteredMedia: (media) => set({ filteredMedia: media }),
}));
