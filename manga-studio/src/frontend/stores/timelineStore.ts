import { create } from "zustand";

interface TimelineState {
  durationMs: number;
  playbackPositionMs: number;
  isPlaying: boolean;
  setDuration: (ms: number) => void;
  setPlaybackPosition: (ms: number) => void;
  setPlaying: (playing: boolean) => void;
}

export const useTimelineStore = create<TimelineState>((set) => ({
  durationMs: 0,
  playbackPositionMs: 0,
  isPlaying: false,
  setDuration: (ms) => set({ durationMs: ms }),
  setPlaybackPosition: (ms) => set({ playbackPositionMs: ms }),
  setPlaying: (playing) => set({ isPlaying: playing }),
}));
