import { create } from 'zustand';

type ImageGroupState = {
  selectedGroup: string | null;
  images: string[];
  setSelectedGroup: (group: string | null) => void;
  addImage: (image: string) => void;
  removeImage: (image: string) => void;
  resetState: () => void;
};

export const useImageGroupStore = create<ImageGroupState>((set) => ({
  selectedGroup: null,
  images: [],
  setSelectedGroup: (group) => set({ selectedGroup: group }),
  addImage: (image) =>
    set((state) => ({
      images: [...state.images, image],
    })),
  removeImage: (image) =>
    set((state) => ({
      images: state.images.filter((img) => img !== image),
    })),
  resetState: () => set({ selectedGroup: null, images: [] }),
}));
