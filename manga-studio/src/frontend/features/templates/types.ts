export interface Template {
  id: string;
  name: string;
  category: TemplateCategory;
  description: string;
  thumbnailPath: string;
  stylePreset: StylePreset;
  sampleScript: string | null;
  isCustom: boolean;
}

export type TemplateCategory = "fantasy" | "urban" | "mystery" | "romance" | "scifi" | "custom";

export interface StylePreset {
  imageModelId: string;
  imageStyle: string;
  negativePrompt: string;
  defaultTransition: string;
  musicStyle: string;
  colorPalette: string[];
}
