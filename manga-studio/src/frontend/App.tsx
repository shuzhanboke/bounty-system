import { useEffect, useState } from "react";
import { greet, getSystemInfo } from "./services/tauriBridge";

function App() {
  const [greeting, setGreeting] = useState<string>("");
  const [sysInfo, setSysInfo] = useState<{ os: string; arch: string; version: string } | null>(null);

  useEffect(() => {
    greet("创作者").then(setGreeting).catch(() => setGreeting("前端独立运行模式"));
    getSystemInfo().then(setSysInfo).catch(() => setSysInfo(null));
  }, []);

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-900 text-white gap-4">
      <h1 className="text-3xl font-bold">AI漫剧工作室</h1>
      {greeting && <p className="text-lg text-blue-400">{greeting}</p>}
      {sysInfo && (
        <p className="text-sm text-gray-400">
          {sysInfo.os}/{sysInfo.arch} v{sysInfo.version}
        </p>
      )}
    </div>
  );
}

export default App;
