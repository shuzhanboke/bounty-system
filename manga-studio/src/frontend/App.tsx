import { useState, useCallback } from "react";
import { Layout } from "./components/layout/Layout";
import { ScriptEditor } from "./features/script/ScriptEditor";
import { useScriptAutoSave } from "./features/script/useScriptAutoSave";
import type { PanelType } from "./components/layout/Sidebar";

function App() {
  const [activePanel, setActivePanel] = useState<PanelType>("script");
  const [scriptText, setScriptText] = useState("");

  const handleAutoSave = useCallback(async (data: unknown) => {
    console.log("[AutoSave]", data);
  }, []);

  useScriptAutoSave({
    data: { scriptText },
    onSave: handleAutoSave,
  });

  return (
    <Layout
      activePanel={activePanel}
      onPanelChange={setActivePanel}
      rightPanel={
        <div>
          <h3 className="mb-2 text-sm font-semibold text-gray-400">属性面板</h3>
          <p className="text-xs text-gray-500">选中元素后在此编辑属性</p>
        </div>
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
      {activePanel !== "script" && (
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <p className="text-sm text-gray-400">此面板功能开发中...</p>
        </div>
      )}
    </Layout>
  );
}

export default App;
