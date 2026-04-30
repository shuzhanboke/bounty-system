import { create } from "zustand";

type TaskStatus = "pending" | "running" | "success" | "failed" | "cancelled";

interface GenerationTaskState {
  id: string;
  type: "image" | "video" | "voice";
  status: TaskStatus;
  progress: number;
  error: string | null;
}

interface GenerationState {
  queue: GenerationTaskState[];
  activeTaskId: string | null;
  submitTask: (task: Omit<GenerationTaskState, "progress" | "error">) => void;
  updateTaskStatus: (id: string, status: TaskStatus, error?: string) => void;
  updateTaskProgress: (id: string, progress: number) => void;
  removeTask: (id: string) => void;
}

export const useGenerationStore = create<GenerationState>((set) => ({
  queue: [],
  activeTaskId: null,
  submitTask: (task) =>
    set((state) => ({
      queue: [...state.queue, { ...task, progress: 0, error: null }],
    })),
  updateTaskStatus: (id, status, error) =>
    set((state) => ({
      queue: state.queue.map((t) =>
        t.id === id ? { ...t, status, error: error ?? null } : t,
      ),
    })),
  updateTaskProgress: (id, progress) =>
    set((state) => ({
      queue: state.queue.map((t) =>
        t.id === id ? { ...t, progress } : t,
      ),
    })),
  removeTask: (id) =>
    set((state) => ({
      queue: state.queue.filter((t) => t.id !== id),
    })),
}));
