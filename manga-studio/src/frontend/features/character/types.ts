export interface Character {
  id: string;
  name: string;
  appearanceDescription: string;
  styleTags: string[];
  referenceImages: ReferenceImage[];
  voiceId: string | null;
}

export interface ReferenceImage {
  id: string;
  filePath: string;
  thumbnailPath: string;
  uploadedAt: string;
}
