import { useMemo } from "react";
import { LayoutGrid } from "lucide-react";
import { StoryboardCard } from "./StoryboardCard";
import { parseScriptToScenes } from "./scriptParser";
import type { Storyboard } from "./types";

interface StoryboardPanelProps {
  scriptText: string;
  selectedStoryboardId: string | null;
  onSelectStoryboard: (id: string) => void;
}

export function StoryboardPanel({
  scriptText,
  selectedStoryboardId,
  onSelectStoryboard,
}: StoryboardPanelProps) {
  const scenes = useMemo(() => parseScriptToScenes(scriptText), [scriptText]);

  const allStoryboards = scenes.flatMap((s) => s.storyboards);

  if (allStoryboards.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 text-gray-500">
        <LayoutGrid size={32} />
        <p className="text-sm">输入剧本后自动生成分镜卡片</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-gray-700 px-4 py-2">
        <div className="flex items-center gap-2">
          <LayoutGrid size={16} className="text-blue-400" />
          <h2 className="text-sm font-semibold">分镜面板</h2>
        </div>
        <span className="text-xs text-gray-400">{allStoryboards.length} 个分镜</span>
      </div>
      <div className="flex-1 space-y-3 overflow-auto p-3">
        {scenes.map((scene) => (
          <div key={scene.id}>
            <h3 className="mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {scene.name}
            </h3>
            <div className="space-y-2">
              {scene.storyboards.map((sb: Storyboard) => (
                <StoryboardCard
                  key={sb.id}
                  storyboard={sb}
                  isSelected={selectedStoryboardId === sb.id}
                  onSelect={onSelectStoryboard}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
