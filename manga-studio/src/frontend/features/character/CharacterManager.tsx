import { useState, useCallback } from "react";
import { Plus, Edit2, Trash2, User } from "lucide-react";
import { useCharacterStore } from "./characterStore";
import { CharacterForm } from "./CharacterForm";
import type { Character } from "./types";

export function CharacterManager() {
  const { characters, addCharacter, updateCharacter, removeCharacter, addReferenceImage } =
    useCharacterStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const editingCharacter = editingId ? characters.find((c) => c.id === editingId) ?? null : null;

  const handleSaveNew = useCallback(
    (data: Omit<Character, "id">) => {
      addCharacter(data);
      setIsCreating(false);
    },
    [addCharacter],
  );

  const handleSaveEdit = useCallback(
    (data: Omit<Character, "id">) => {
      if (editingId) {
        updateCharacter(editingId, data);
        setEditingId(null);
      }
    },
    [editingId, updateCharacter],
  );

  const handleUploadReference = useCallback(async () => {
    try {
      const { open } = await import("@tauri-apps/plugin-dialog");
      const selected = await open({
        multiple: true,
        filters: [
          { name: "图片", extensions: ["png", "jpg", "jpeg", "webp"] },
        ],
      });
      if (selected && editingId) {
        const paths = Array.isArray(selected) ? selected : [selected];
        for (const p of paths) {
          const filePath = typeof p === "string" ? p : p;
          addReferenceImage(editingId, {
            filePath,
            thumbnailPath: filePath,
          });
        }
      }
    } catch {
      // Dialog not available in browser mode
      console.warn("文件对话框仅在Tauri环境中可用");
    }
  }, [editingId, addReferenceImage]);

  if (isCreating) {
    return (
      <div className="p-4">
        <h2 className="mb-4 text-sm font-semibold text-gray-300">创建新角色</h2>
        <CharacterForm
          onSave={handleSaveNew}
          onCancel={() => setIsCreating(false)}
          onUploadReference={handleUploadReference}
        />
      </div>
    );
  }

  if (editingCharacter) {
    return (
      <div className="p-4">
        <h2 className="mb-4 text-sm font-semibold text-gray-300">编辑角色</h2>
        <CharacterForm
          character={editingCharacter}
          onSave={handleSaveEdit}
          onCancel={() => setEditingId(null)}
          onUploadReference={handleUploadReference}
        />
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-gray-700 px-4 py-2">
        <div className="flex items-center gap-2">
          <User size={16} className="text-blue-400" />
          <h2 className="text-sm font-semibold">角色库</h2>
        </div>
        <button
          className="flex items-center gap-1 rounded bg-blue-600 px-2 py-1 text-xs text-white hover:bg-blue-700"
          onClick={() => setIsCreating(true)}
        >
          <Plus size={12} />
          新建角色
        </button>
      </div>

      {characters.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 text-gray-500">
          <User size={32} />
          <p className="text-sm">暂无角色</p>
          <p className="text-xs">创建角色后可在分镜中关联使用</p>
        </div>
      ) : (
        <div className="flex-1 space-y-2 overflow-auto p-3">
          {characters.map((char) => (
            <div
              key={char.id}
              className="flex items-start gap-3 rounded-lg border border-gray-700 bg-gray-800 p-3"
            >
              {char.referenceImages[0] ? (
                <img
                  src={char.referenceImages[0].thumbnailPath}
                  alt={char.name}
                  className="h-12 w-12 rounded object-cover"
                />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded bg-gray-700">
                  <User size={20} className="text-gray-500" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-200">{char.name}</h3>
                <p className="line-clamp-2 text-xs text-gray-400">
                  {char.appearanceDescription || "无外貌描述"}
                </p>
                {char.styleTags.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1">
                    {char.styleTags.map((tag) => (
                      <span key={tag} className="rounded bg-blue-600/20 px-1.5 py-0.5 text-xs text-blue-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-1">
                <button
                  className="rounded p-1 text-gray-400 hover:bg-gray-700 hover:text-white"
                  onClick={() => setEditingId(char.id)}
                  title="编辑"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  className="rounded p-1 text-gray-400 hover:bg-red-700 hover:text-red-400"
                  onClick={() => removeCharacter(char.id)}
                  title="删除"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
