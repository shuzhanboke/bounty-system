import { useState, useCallback, useMemo, useEffect } from "react";
import { Layout } from "./components/layout/Layout";
import { ScriptEditor } from "./features/script/ScriptEditor";
import { StoryboardPanel } from "./features/script/StoryboardPanel";
import { StoryboardDetail } from "./features/script/StoryboardDetail";
import { CharacterManager } from "./features/character/CharacterManager";
import { useCharacterStore } from "./features/character/characterStore";
import { useScriptAutoSave } from "./features/script/useScriptAutoSave";
import { parseScriptToScenes } from "./features/script/scriptParser";
import type { PanelType } from "./components/layout/Sidebar";
import type { Storyboard } from "./features/script/types";

function App() {
  const [activePanel, setActivePanel] = useState<PanelType>("script");
  const [scriptText, setScriptText] = useState("");
  const [selectedStoryboardId, setSelectedStoryboardId] = useState<string | null>(null);
  const [storyboardUpdates, setStoryboardUpdates] = useState<Map<string, Partial<Storyboard>>>(new Map());

  const scenes = useMemo(() => parseScriptToScenes(scriptText), [scriptText]);
  const allStoryboards = useMemo(() => scenes.flatMap((s) => s.storyboards), [scenes]);
  const selectedStoryboard = useMemo(() => {
    if (!selectedStoryboardId) return null;
    const sb = allStoryboards.find((s) => s.id === selectedStoryboardId);
    if (!sb) return null;
    const updates = storyboardUpdates.get(selectedStoryboardId);
    return updates ? { ...sb, ...updates } : sb;
  }, [selectedStoryboardId, allStoryboards, storyboardUpdates]);

  const handleAutoSave = useCallback(async (data: unknown) => {
    console.log("[AutoSave]", data);
  }, []);

  const handleStoryboardUpdate = useCallback((id: string, updates: Partial<Storyboard>) => {
    setStoryboardUpdates((prev) => {
      const next = new Map(prev);
      const existing = next.get(id) ?? {};
      next.set(id, { ...existing, ...updates });
      return next;
    });
  }, []);

  const setOnCharacterChanged = useCharacterStore((s) => s.setOnCharacterChanged);

  useEffect(() => {
    setOnCharacterChanged((characterId: string) => {
      const affectedIds = allStoryboards
        .filter((sb) => sb.characterIds.includes(characterId))
        .map((sb) => sb.id);
      if (affectedIds.length > 0) {
        setStoryboardUpdates((prev) => {
          const next = new Map(prev);
          for (const id of affectedIds) {
            const existing = next.get(id) ?? {};
            next.set(id, { ...existing, needsRegeneration: true });
          }
          return next;
        });
      }
    });
  }, [allStoryboards, setOnCharacterChanged]);

  useScriptAutoSave({
    data: { scriptText },
    onSave: handleAutoSave,
  });

  return (
    <Layout
      activePanel={activePanel}
      onPanelChange={setActivePanel}
      rightPanel={
        selectedStoryboard ? (
          <StoryboardDetail
            storyboard={selectedStoryboard}
            onUpdate={handleStoryboardUpdate}
          />
        ) : activePanel === "script" || activePanel === "storyboard" ? (
          <StoryboardPanel
            scriptText={scriptText}
            selectedStoryboardId={selectedStoryboardId}
            onSelectStoryboard={setSelectedStoryboardId}
          />
        ) : (
          <div>
            <h3 className="mb-2 text-sm font-semibold text-gray-400">属性面板</h3>
            <p className="text-xs text-gray-500">选中元素后在此编辑属性</p>
          </div>
        )
      }
      bottomPanel={
        <div className="flex h-full items-center justify-center text-gray-500">
          <span>时间轴编辑器区域</span>
        </div>
      }
    >
      {activePanel === "script" && (
        <ScriptEditor value={scriptText} onChange={setScriptText} />
      )}
      {activePanel === "storyboard" && (
        <StoryboardPanel
          scriptText={scriptText}
          selectedStoryboardId={selectedStoryboardId}
          onSelectStoryboard={setSelectedStoryboardId}
        />
      )}
      {activePanel === "character" && <CharacterManager />}
      {activePanel !== "script" && activePanel !== "storyboard" && activePanel !== "character" && (
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <p className="text-sm text-gray-400">此面板功能开发中...</p>
        </div>
      )}
    </Layout>
  );
}

export default App;
