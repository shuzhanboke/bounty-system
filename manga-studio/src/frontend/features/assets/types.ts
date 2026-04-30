export type AssetType = "image" | "video" | "audio";
export type AssetSource = "ai-generated" | "local-import";

export interface Asset {
  id: string;
  type: AssetType;
  source: AssetSource;
  filePath: string;
  thumbnailPath: string | null;
  duration: number | null;
  modelUsed: string | null;
  generationParams: Record<string, unknown> | null;
  createdAt: string;
  name: string;
  fileSize: number;
}

export const SUPPORTED_FORMATS = {
  image: ["image/png", "image/jpeg", "image/webp"],
  video: ["video/mp4", "video/webm"],
  audio: ["audio/mpeg", "audio/wav", "audio/mp3"],
} as const;

export const SUPPORTED_EXTENSIONS = {
  image: [".png", ".jpg", ".jpeg", ".webp"],
  video: [".mp4", ".webm"],
  audio: [".mp3", ".wav"],
} as const;
