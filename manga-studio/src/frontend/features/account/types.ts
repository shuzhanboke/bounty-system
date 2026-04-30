export type UserTier = "free" | "subscription";

export interface Quota {
  imageCount: number;
  imageCountLimit: number;
  videoCount: number;
  videoCountLimit: number;
  voiceDurationSec: number;
  voiceDurationLimitSec: number;
}

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  tier: UserTier;
  quota: Quota;
  dailyUsage: DailyUsage;
}

export interface DailyUsage {
  imagesGenerated: number;
  videosGenerated: number;
  voiceSecondsUsed: number;
  resetAt: string;
}

export interface QuotaCheckResult {
  allowed: boolean;
  reason: string | null;
  remaining: number;
}
