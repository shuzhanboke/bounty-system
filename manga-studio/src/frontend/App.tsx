import { Layout } from "./components/layout/Layout";
import { FileText } from "lucide-react";

function App() {
  return (
    <Layout
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
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <FileText size={48} className="text-blue-400" />
        <h2 className="text-xl font-semibold">开始创作你的漫剧</h2>
        <p className="text-sm text-gray-400">在左侧面板中选择剧本编辑器开始编写</p>
      </div>
    </Layout>
  );
}

export default App;
