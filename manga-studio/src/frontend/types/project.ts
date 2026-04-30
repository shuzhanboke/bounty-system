import type { ScriptContent, Scene, Storyboard } from "../features/script/types";
import type { Character, ReferenceImage } from "../features/character/types";
import type { Asset } from "../features/assets/types";
import type { TimelineData } from "../features/timeline/types";

export interface Project {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  script: ScriptContent;
  scenes: Scene[];
  characters: Character[];
  assets: Asset[];
  timeline: TimelineData;
  templateId: string | null;
}

export { type ScriptContent, type Scene, type Storyboard };
export { type Character, type ReferenceImage };
export { type Asset };
export { type TimelineData };
