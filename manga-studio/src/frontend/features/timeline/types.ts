export interface TimelineData {
  tracks: Track[];
  durationMs: number;
}

export interface Track {
  id: string;
  type: "video" | "voice" | "music";
  label: string;
  clips: Clip[];
  muted: boolean;
  volume: number;
}

export interface Clip {
  id: string;
  assetId: string;
  trackId: string;
  startMs: number;
  endMs: number;
  volume: number;
  fadeInMs: number;
  fadeOutMs: number;
  transitionId: string | null;
}

export interface Transition {
  id: string;
  name: string;
  durationMs: number;
  type: "fade" | "dissolve" | "slide" | "wipe";
}

export interface GapOverlapInfo {
  type: "gap" | "overlap";
  trackId: string;
  startMs: number;
  endMs: number;
}
