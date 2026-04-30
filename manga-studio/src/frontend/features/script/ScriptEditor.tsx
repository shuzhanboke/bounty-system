import { useState, useCallback } from "react";
import { FileText, AlertCircle } from "lucide-react";

interface ScriptEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function ScriptEditor({ value, onChange }: ScriptEditorProps) {
  const [isEmpty, setIsEmpty] = useState(value.trim().length === 0);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      onChange(newValue);
      setIsEmpty(newValue.trim().length === 0);
    },
    [onChange],
  );

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b border-gray-700 px-4 py-2">
        <FileText size={16} className="text-blue-400" />
        <h2 className="text-sm font-semibold">剧本编辑器</h2>
      </div>
      <textarea
        className="flex-1 resize-none bg-gray-900 p-4 font-mono text-sm text-gray-200 placeholder-gray-600 outline-none"
        value={value}
        onChange={handleChange}
        placeholder="在此输入或粘贴剧本内容...&#10;&#10;格式示例：&#10;【场景1】夜晚的古城街道&#10;角色A：你终于来了...&#10;旁白：月光洒在青石板上..."
      />
      {isEmpty && (
        <div className="flex items-center gap-2 border-t border-gray-700 bg-gray-800/50 px-4 py-2 text-xs text-yellow-400">
          <AlertCircle size={14} />
          <span>请输入有效剧本内容，系统将自动拆解为分镜卡片</span>
        </div>
      )}
    </div>
  );
}
