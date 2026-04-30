import { useState } from "react";
import { Eye } from "lucide-react";
import type { Storyboard } from "./types";

interface StoryboardDetailProps {
  storyboard: Storyboard;
  onUpdate: (id: string, updates: Partial<Storyboard>) => void;
  characterNames?: Record<string, string>;
}

export function StoryboardDetail({ storyboard, onUpdate, characterNames = {} }: StoryboardDetailProps) {
  const [editDescription, setEditDescription] = useState(storyboard.sceneDescription);
  const [editCamera, setEditCamera] = useState(storyboard.cameraSuggestion);

  const handleDescriptionChange = (value: string) => {
    setEditDescription(value);
    onUpdate(storyboard.id, { sceneDescription: value });
  };

  const handleCameraChange = (value: string) => {
    setEditCamera(value);
    onUpdate(storyboard.id, { cameraSuggestion: value });
  };

  const promptPreview = [
    editDescription,
    storyboard.dialogue && `对话：${storyboard.dialogue}`,
    storyboard.narration && `旁白：${storyboard.narration}`,
    editCamera && `运镜：${editCamera}`,
    storyboard.characterIds.length > 0 &&
      `角色：${storyboard.characterIds.map((id) => characterNames[id] ?? id).join("、")}`,
  ]
    .filter(Boolean)
    .join("，");

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-300">分镜 #{storyboard.order + 1} 详情</h3>
        {storyboard.needsRegeneration && (
          <span className="rounded bg-yellow-600/20 px-2 py-0.5 text-xs text-yellow-400">
            需重新生成
          </span>
        )}
      </div>

      <div>
        <label className="mb-1 block text-xs text-gray-400">画面描述</label>
        <textarea
          className="w-full rounded border border-gray-600 bg-gray-700 p-2 text-sm text-gray-200 outline-none focus:border-blue-500"
          rows={3}
          value={editDescription}
          onChange={(e) => handleDescriptionChange(e.target.value)}
          placeholder="描述分镜画面内容..."
        />
      </div>

      <div>
        <label className="mb-1 block text-xs text-gray-400">运镜建议</label>
        <input
          className="w-full rounded border border-gray-600 bg-gray-700 p-2 text-sm text-gray-200 outline-none focus:border-blue-500"
          value={editCamera}
          onChange={(e) => handleCameraChange(e.target.value)}
          placeholder="如：特写、远景、俯拍..."
        />
      </div>

      {storyboard.dialogue && (
        <div>
          <label className="mb-1 block text-xs text-gray-400">角色对话</label>
          <p className="rounded bg-gray-700/50 p-2 text-sm text-green-400 whitespace-pre-wrap">
            {storyboard.dialogue}
          </p>
        </div>
      )}

      {storyboard.narration && (
        <div>
          <label className="mb-1 block text-xs text-gray-400">旁白</label>
          <p className="rounded bg-gray-700/50 p-2 text-sm text-purple-400 italic whitespace-pre-wrap">
            {storyboard.narration}
          </p>
        </div>
      )}

      <div className="border-t border-gray-700 pt-3">
        <div className="flex items-center gap-2 mb-2">
          <Eye size={14} className="text-blue-400" />
          <span className="text-xs font-semibold text-gray-400">AI生成指令预览</span>
        </div>
        <p className="rounded bg-blue-900/20 border border-blue-800/30 p-2 text-xs text-blue-300">
          {promptPreview || "编辑画面描述后自动生成指令预览"}
        </p>
      </div>
    </div>
  );
}
