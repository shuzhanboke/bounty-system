import { Toolbar } from "./Toolbar";
import { Sidebar, type PanelType } from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
  rightPanel?: React.ReactNode;
  bottomPanel?: React.ReactNode;
  activePanel: PanelType;
  onPanelChange: (panel: PanelType) => void;
}

export function Layout({ children, rightPanel, bottomPanel, activePanel, onPanelChange }: LayoutProps) {
  return (
    <div className="flex h-screen flex-col bg-gray-900 text-white">
      <Toolbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activePanel={activePanel} onPanelChange={onPanelChange} />
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex flex-1 overflow-hidden">
            <main className="flex-1 overflow-auto p-4">{children}</main>
            {rightPanel && (
              <aside className="w-64 border-l border-gray-700 bg-gray-800 overflow-auto p-4">
                {rightPanel}
              </aside>
            )}
          </div>
          {bottomPanel && (
            <div className="h-48 border-t border-gray-700 bg-gray-800 overflow-auto">
              {bottomPanel}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
