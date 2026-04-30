import { Save, Download, Settings, Undo, Redo } from "lucide-react";

export function Toolbar() {
  return (
    <header className="flex h-12 items-center justify-between border-b border-gray-700 bg-gray-800 px-4">
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold text-blue-400">AI漫剧工作室</span>
      </div>
      <div className="flex items-center gap-1">
        <button className="rounded p-1.5 text-gray-400 hover:bg-gray-700 hover:text-white" title="撤销">
          <Undo size={18} />
        </button>
        <button className="rounded p-1.5 text-gray-400 hover:bg-gray-700 hover:text-white" title="重做">
          <Redo size={18} />
        </button>
        <div className="mx-2 h-5 w-px bg-gray-600" />
        <button className="rounded p-1.5 text-gray-400 hover:bg-gray-700 hover:text-white" title="保存">
          <Save size={18} />
        </button>
        <button className="rounded p-1.5 text-gray-400 hover:bg-gray-700 hover:text-white" title="导出">
          <Download size={18} />
        </button>
        <button className="rounded p-1.5 text-gray-400 hover:bg-gray-700 hover:text-white" title="设置">
          <Settings size={18} />
        </button>
      </div>
    </header>
  );
}
