import { h } from "preact";
import { useState } from "preact/hooks";
import { cn } from "../../utils/cn";

interface SeoToolIntegrationsProps {
  onConnect: (toolName: string) => void;
}

const tools = [
  { name: "Google Analytics", icon: "🔗" },
  { name: "SEMrush", icon: "🔍" },
  { name: "Ahrefs", icon: "📈" },
  { name: "Moz", icon: "🧭" },
  { name: "Screaming Frog", icon: "🐸" }
];

export const SeoToolIntegrations = ({ onConnect }: SeoToolIntegrationsProps) => {
  const [connectedTools, setConnectedTools] = useState<string[]>([]);

  const handleConnect = (toolName: string) => {
    if (!connectedTools.includes(toolName)) {
      setConnectedTools([...connectedTools, toolName]);
      onConnect(toolName);
    }
  };

  return (
    <div className="seo-tool-integrations p-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Connect to SEO Tools
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full overflow-x-hidden">
        {tools.map(tool => (
          <button
            key={tool.name}
            onClick={() => handleConnect(tool.name)}
            className={cn(
              "p-4 rounded-lg border transition-all flex items-center justify-between",
              connectedTools.includes(tool.name)
                ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
            )}
          >
            <div className="flex items-center">
              <span className="text-2xl mr-3">{tool.icon}</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {tool.name}
              </span>
            </div>
            {connectedTools.includes(tool.name) && (
              <span className="text-green-600 dark:text-green-400 text-sm font-medium">
                Connected
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
