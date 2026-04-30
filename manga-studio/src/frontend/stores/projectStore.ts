import { create } from "zustand";

interface ProjectState {
  projectId: string | null;
  projectName: string;
  isDirty: boolean;
  setProjectId: (id: string | null) => void;
  setProjectName: (name: string) => void;
  markDirty: () => void;
  markClean: () => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  projectId: null,
  projectName: "未命名项目",
  isDirty: false,
  setProjectId: (id) => set({ projectId: id }),
  setProjectName: (name) => set({ projectName: name, isDirty: true }),
  markDirty: () => set({ isDirty: true }),
  markClean: () => set({ isDirty: false }),
}));
