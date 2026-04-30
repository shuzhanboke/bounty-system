import { create } from "zustand";

interface Quota {
  imageCount: number;
  videoCount: number;
  voiceDurationSec: number;
}

interface AccountState {
  isLoggedIn: boolean;
  userId: string | null;
  tier: "free" | "subscription";
  quota: Quota;
  login: (userId: string) => void;
  logout: () => void;
  setTier: (tier: "free" | "subscription") => void;
  consumeQuota: (type: "image" | "video" | "voice", amount: number) => void;
}

export const useAccountStore = create<AccountState>((set) => ({
  isLoggedIn: false,
  userId: null,
  tier: "free",
  quota: {
    imageCount: 10,
    videoCount: 5,
    voiceDurationSec: 300,
  },
  login: (userId) => set({ isLoggedIn: true, userId }),
  logout: () => set({ isLoggedIn: false, userId: null }),
  setTier: (tier) => set({ tier }),
  consumeQuota: (type, amount) =>
    set((state) => {
      const quota = { ...state.quota };
      if (type === "image") quota.imageCount = Math.max(0, quota.imageCount - amount);
      if (type === "video") quota.videoCount = Math.max(0, quota.videoCount - amount);
      if (type === "voice") quota.voiceDurationSec = Math.max(0, quota.voiceDurationSec - amount);
      return { quota };
    }),
}));
