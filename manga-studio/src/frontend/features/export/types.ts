export type ExportResolution = "720p" | "1080p" | "4k";
export type ExportFormat = "mp4" | "webm";
export type ExportFps = 24 | 30 | 60;
export type AspectRatio = "16:9" | "9:16";

export interface ExportParams {
  resolution: ExportResolution;
  format: ExportFormat;
  fps: ExportFps;
  aspectRatio: AspectRatio;
  outputPath: string;
}

export interface ExportProgress {
  taskId: string;
  percent: number;
  currentFrame: number;
  totalFrames: number;
  estimatedRemainingSec: number;
  status: ExportStatus;
}

export type ExportStatus = "preparing" | "rendering" | "compositing" | "completed" | "failed" | "cancelled";

export interface ExportResult {
  filePath: string;
  fileSize: number;
  durationMs: number;
  resolution: string;
  format: string;
}
