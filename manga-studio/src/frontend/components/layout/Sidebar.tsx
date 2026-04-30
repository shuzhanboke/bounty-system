import {
  FileText,
  LayoutGrid,
  Users,
  Image,
  BookTemplate,
  UserCircle,
} from "lucide-react";

export type PanelType = "script" | "storyboard" | "character" | "assets" | "templates" | "account";

interface SidebarProps {
  activePanel: PanelType;
  onPanelChange: (panel: PanelType) => void;
}

const panels: { key: PanelType; icon: typeof FileText; label: string }[] = [
  { key: "script", icon: FileText, label: "剧本" },
  { key: "storyboard", icon: LayoutGrid, label: "分镜" },
  { key: "character", icon: Users, label: "角色" },
  { key: "assets", icon: Image, label: "素材" },
  { key: "templates", icon: BookTemplate, label: "模板" },
  { key: "account", icon: UserCircle, label: "账户" },
];

export function Sidebar({ activePanel, onPanelChange }: SidebarProps) {
  return (
    <nav className="flex w-14 flex-col items-center gap-1 border-r border-gray-700 bg-gray-800 py-2">
      {panels.map(({ key, icon: Icon, label }) => (
        <button
          key={key}
          className={`flex flex-col items-center gap-0.5 rounded p-2 text-xs transition-colors ${
            activePanel === key
              ? "bg-blue-600/20 text-blue-400"
              : "text-gray-400 hover:bg-gray-700 hover:text-white"
          }`}
          onClick={() => onPanelChange(key)}
          title={label}
        >
          <Icon size={20} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}
