import { create } from "zustand";
import type { Character, ReferenceImage } from "./types";

function generateId(): string {
  return `char-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

interface CharacterState {
  characters: Character[];
  addCharacter: (char: Omit<Character, "id">) => string;
  updateCharacter: (id: string, updates: Partial<Character>) => void;
  removeCharacter: (id: string) => void;
  addReferenceImage: (characterId: string, image: Omit<ReferenceImage, "id" | "uploadedAt">) => void;
  removeReferenceImage: (characterId: string, imageId: string) => void;
}

export const useCharacterStore = create<CharacterState>((set) => ({
  characters: [],

  addCharacter: (char) => {
    const id = generateId();
    set((state) => ({
      characters: [...state.characters, { ...char, id }],
    }));
    return id;
  },

  updateCharacter: (id, updates) =>
    set((state) => ({
      characters: state.characters.map((c) =>
        c.id === id ? { ...c, ...updates } : c,
      ),
    })),

  removeCharacter: (id) =>
    set((state) => ({
      characters: state.characters.filter((c) => c.id !== id),
    })),

  addReferenceImage: (characterId, image) =>
    set((state) => ({
      characters: state.characters.map((c) =>
        c.id === characterId
          ? {
              ...c,
              referenceImages: [
                ...c.referenceImages,
                { ...image, id: `img-${Date.now()}`, uploadedAt: new Date().toISOString() },
              ],
            }
          : c,
      ),
    })),

  removeReferenceImage: (characterId, imageId) =>
    set((state) => ({
      characters: state.characters.map((c) =>
        c.id === characterId
          ? {
              ...c,
              referenceImages: c.referenceImages.filter((img) => img.id !== imageId),
            }
          : c,
      ),
    })),
}));
