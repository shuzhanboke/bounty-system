import type {
  GenerationType,
  GenerationResult,
  VoiceResult,
  ImageGenerationParams,
  VideoGenerationParams,
  VoiceGenerationParams,
  ModelInfo,
} from "../features/generation/types";

export type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

export interface GenerationError {
  code: string;
  message: string;
  retryable: boolean;
}

export interface GenerationService {
  generateImage(params: ImageGenerationParams): Promise<Result<GenerationResult, GenerationError>>;
  generateVideo(params: VideoGenerationParams): Promise<Result<GenerationResult, GenerationError>>;
  generateVoice(params: VoiceGenerationParams): Promise<Result<VoiceResult, GenerationError>>;
  getAvailableModels(type: GenerationType): ModelInfo[];
}

export interface GenerationOrchestrator {
  submitTask(task: { type: GenerationType; storyboardId: string; modelId: string; params: unknown }): string;
  cancelTask(id: string): void;
  retryTask(id: string): void;
  acceptResult(id: string): void;
  rejectResult(id: string, adjustedParams?: unknown): void;
  getQueueStatus(): { total: number; pending: number; running: number; completed: number; failed: number };
}
