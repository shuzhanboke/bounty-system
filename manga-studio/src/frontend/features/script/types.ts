export interface ScriptContent {
  rawText: string;
  lastEditedAt: string;
}

export interface Scene {
  id: string;
  name: string;
  order: number;
  storyboards: Storyboard[];
}

export interface Storyboard {
  id: string;
  sceneId: string;
  order: number;
  sceneDescription: string;
  characterIds: string[];
  dialogue: string;
  narration: string;
  cameraSuggestion: string;
  generationPrompt: string;
  selectedImageId: string | null;
  selectedVideoId: string | null;
  needsRegeneration: boolean;
}
