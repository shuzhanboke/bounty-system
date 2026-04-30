import { Image, Video, MessageSquare, RefreshCw } from "lucide-react";
import type { Storyboard } from "./types";

interface StoryboardCardProps {
  storyboard: Storyboard;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export function StoryboardCard({ storyboard, isSelected, onSelect }: StoryboardCardProps) {
  return (
    <button
      className={`flex w-full flex-col gap-2 rounded-lg border p-3 text-left transition-colors ${
        isSelected
          ? "border-blue-500 bg-blue-500/10"
          : "border-gray-700 bg-gray-800 hover:border-gray-600"
      }`}
      onClick={() => onSelect(storyboard.id)}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-gray-400">分镜 #{storyboard.order + 1}</span>
        {storyboard.needsRegeneration && (
          <span className="flex items-center gap-1 text-xs text-yellow-400">
            <RefreshCw size={12} />
            需重新生成
          </span>
        )}
      </div>

      <p className="line-clamp-2 text-sm text-gray-200">{storyboard.sceneDescription || "无画面描述"}</p>

      {storyboard.dialogue && (
        <div className="flex items-start gap-1 text-xs text-green-400">
          <MessageSquare size={12} className="mt-0.5 shrink-0" />
          <span className="line-clamp-1">{storyboard.dialogue}</span>
        </div>
      )}

      {storyboard.narration && (
        <div className="text-xs text-purple-400 italic line-clamp-1">
          旁白：{storyboard.narration}
        </div>
      )}

      <div className="flex items-center gap-2 text-xs text-gray-500">
        {storyboard.selectedImageId ? (
          <span className="flex items-center gap-0.5 text-blue-400">
            <Image size={10} /> 已生成图片
          </span>
        ) : (
          <span className="flex items-center gap-0.5">
            <Image size={10} /> 待生成
          </span>
        )}
        {storyboard.selectedVideoId ? (
          <span className="flex items-center gap-0.5 text-blue-400">
            <Video size={10} /> 已生成视频
          </span>
        ) : (
          <span className="flex items-center gap-0.5">
            <Video size={10} /> 待生成
          </span>
        )}
      </div>
    </button>
  );
}
