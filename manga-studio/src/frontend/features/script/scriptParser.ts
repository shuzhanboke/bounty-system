import type { Scene, Storyboard } from "./types";

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

const SCENE_PATTERN = /^【(.+?)】(.+)$/;
const DIALOGUE_PATTERN = /^(.+?)[:：](.+)$/;
const NARRATION_PATTERN = /^旁白[:：](.+)$/;

function ensureScene(scenes: Scene[], currentScene: Scene | null): Scene {
  if (currentScene) return currentScene;
  const scene: Scene = {
    id: generateId(),
    name: "场景1",
    order: 0,
    storyboards: [],
  };
  scenes.push(scene);
  return scene;
}

export function parseScriptToScenes(scriptText: string): Scene[] {
  if (!scriptText.trim()) return [];

  const lines = scriptText.split("\n");
  const scenes: Scene[] = [];
  let currentScene: Scene | null = null;
  let storyboardOrder = 0;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    const sceneMatch = line.match(SCENE_PATTERN);
    if (sceneMatch) {
      storyboardOrder = 0;
      const scene: Scene = {
        id: generateId(),
        name: sceneMatch[1] ?? "未命名场景",
        order: scenes.length,
        storyboards: [],
      };
      currentScene = scene;
      scenes.push(scene);

      const storyboard: Storyboard = {
        id: generateId(),
        sceneId: scene.id,
        order: storyboardOrder++,
        sceneDescription: sceneMatch[2]?.trim() ?? "",
        characterIds: [],
        dialogue: "",
        narration: "",
        cameraSuggestion: "",
        generationPrompt: sceneMatch[2]?.trim() ?? "",
        selectedImageId: null,
        selectedVideoId: null,
        needsRegeneration: false,
      };
      scene.storyboards.push(storyboard);
      continue;
    }

    currentScene = ensureScene(scenes, currentScene);

    const narrationMatch = line.match(NARRATION_PATTERN);
    if (narrationMatch) {
      const lastStoryboard = currentScene.storyboards[currentScene.storyboards.length - 1];
      if (lastStoryboard) {
        lastStoryboard.narration += (lastStoryboard.narration ? "\n" : "") + (narrationMatch[1]?.trim() ?? "");
        lastStoryboard.generationPrompt = buildPrompt(lastStoryboard);
      }
      continue;
    }

    const dialogueMatch = line.match(DIALOGUE_PATTERN);
    if (dialogueMatch) {
      const lastStoryboard = currentScene.storyboards[currentScene.storyboards.length - 1];
      if (lastStoryboard) {
        const charName = dialogueMatch[1] ?? "";
        const charDialogue = dialogueMatch[2]?.trim() ?? "";
        lastStoryboard.dialogue += (lastStoryboard.dialogue ? "\n" : "") + `${charName}：${charDialogue}`;
        lastStoryboard.generationPrompt = buildPrompt(lastStoryboard);
      }
      continue;
    }

    const lastStoryboard = currentScene.storyboards[currentScene.storyboards.length - 1];
    if (lastStoryboard) {
      lastStoryboard.sceneDescription += (lastStoryboard.sceneDescription ? " " : "") + line;
      lastStoryboard.generationPrompt = buildPrompt(lastStoryboard);
    }
  }

  return scenes;
}

function buildPrompt(storyboard: Storyboard): string {
  let prompt = storyboard.sceneDescription;
  if (storyboard.dialogue) prompt += `，对话：${storyboard.dialogue}`;
  if (storyboard.narration) prompt += `，旁白：${storyboard.narration}`;
  if (storyboard.cameraSuggestion) prompt += `，运镜：${storyboard.cameraSuggestion}`;
  return prompt;
}
