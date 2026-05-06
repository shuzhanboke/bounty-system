import { useState } from "react";
import { Plus, X, Upload } from "lucide-react";
import type { Character } from "./types";

interface CharacterFormProps {
  character?: Character | null;
  onSave: (data: Omit<Character, "id">) => void;
  onCancel: () => void;
  onUploadReference: () => void;
}

export function CharacterForm({ character, onSave, onCancel, onUploadReference }: CharacterFormProps) {
  const [name, setName] = useState(character?.name ?? "");
  const [appearanceDescription, setAppearanceDescription] = useState(character?.appearanceDescription ?? "");
  const [styleTags, setStyleTags] = useState(character?.styleTags.join(", ") ?? "");
  const [voiceId, setVoiceId] = useState(character?.voiceId ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      appearanceDescription,
      styleTags: styleTags.split(",").map((t) => t.trim()).filter(Boolean),
      referenceImages: character?.referenceImages ?? [],
      voiceId: voiceId || null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div>
        <label className="mb-1 block text-xs text-gray-400">角色名称</label>
        <input
          className="w-full rounded border border-gray-600 bg-gray-700 p-2 text-sm text-gray-200 outline-none focus:border-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="输入角色名称"
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-xs text-gray-400">外貌描述</label>
        <textarea
          className="w-full rounded border border-gray-600 bg-gray-700 p-2 text-sm text-gray-200 outline-none focus:border-blue-500"
          rows={4}
          value={appearanceDescription}
          onChange={(e) => setAppearanceDescription(e.target.value)}
          placeholder="描述角色的外貌特征（用于AI生成参考）"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs text-gray-400">风格标签</label>
        <input
          className="w-full rounded border border-gray-600 bg-gray-700 p-2 text-sm text-gray-200 outline-none focus:border-blue-500"
          value={styleTags}
          onChange={(e) => setStyleTags(e.target.value)}
          placeholder="用逗号分隔，如：古风, 少女, 长发"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs text-gray-400">配音音色ID</label>
        <input
          className="w-full rounded border border-gray-600 bg-gray-700 p-2 text-sm text-gray-200 outline-none focus:border-blue-500"
          value={voiceId}
          onChange={(e) => setVoiceId(e.target.value)}
          placeholder="选择配音音色后自动填入"
        />
      </div>

      {character && (
        <div>
          <label className="mb-1 block text-xs text-gray-400">参考图</label>
          <div className="flex flex-wrap gap-2">
            {character.referenceImages.map((img) => (
              <div key={img.id} className="relative h-16 w-16 overflow-hidden rounded border border-gray-600">
                <img src={img.thumbnailPath} alt="" className="h-full w-full object-cover" />
              </div>
            ))}
            <button
              type="button"
              className="flex h-16 w-16 items-center justify-center rounded border border-dashed border-gray-600 text-gray-400 hover:border-blue-500 hover:text-blue-400"
              onClick={onUploadReference}
            >
              <Upload size={20} />
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          className="flex items-center gap-1 rounded bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
        >
          <Plus size={14} />
          {character ? "保存修改" : "创建角色"}
        </button>
        <button
          type="button"
          className="flex items-center gap-1 rounded bg-gray-700 px-3 py-1.5 text-sm text-gray-300 hover:bg-gray-600"
          onClick={onCancel}
        >
          <X size={14} />
          取消
        </button>
      </div>
    </form>
  );
}
