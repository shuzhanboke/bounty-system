export interface VoiceProfile {
  id: string;
  name: string;
  provider: string;
  language: string;
  gender: "male" | "female" | "neutral";
  previewUrl: string | null;
}

export interface VoiceGenerationRequest {
  storyboardId: string;
  characterId: string;
  voiceId: string;
  text: string;
  isNarration: boolean;
}
