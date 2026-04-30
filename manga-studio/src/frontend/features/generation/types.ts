export type GenerationType = "image" | "video" | "voice";
export type TaskStatus = "pending" | "running" | "success" | "failed" | "cancelled";

export interface GenerationParams {
  prompt: string;
  negativePrompt?: string;
  width?: number;
  height?: number;
  seed?: number;
  referenceImagePaths?: string[];
  characterDescriptions?: string[];
}

export interface ImageGenerationParams extends GenerationParams {
  modelId: string;
  style?: string;
}

export interface VideoGenerationParams extends GenerationParams {
  modelId: string;
  startImagePath: string;
  durationSec?: number;
}

export interface VoiceGenerationParams {
  modelId: string;
  voiceId: string;
  text: string;
  speed?: number;
}

export interface GenerationResult {
  id: string;
  type: GenerationType;
  assetId: string;
  filePath: string;
  thumbnailPath: string | null;
  modelUsed: string;
  createdAt: string;
  generationParams: GenerationParams;
}

export interface VoiceResult {
  id: string;
  assetId: string;
  filePath: string;
  durationMs: number;
  voiceId: string;
  modelUsed: string;
  createdAt: string;
}

export interface GenerationTask {
  id: string;
  type: GenerationType;
  storyboardId: string;
  modelId: string;
  params: GenerationParams | VoiceGenerationParams;
  status: TaskStatus;
  result: GenerationResult | VoiceResult | null;
  error: string | null;
  history: (GenerationResult | VoiceResult)[];
}

export interface ModelInfo {
  id: string;
  name: string;
  type: GenerationType;
  provider: string;
  maxResolution?: string;
  description: string;
}

export interface QueueStatus {
  total: number;
  pending: number;
  running: number;
  completed: number;
  failed: number;
}
