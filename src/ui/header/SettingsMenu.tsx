import { InfoIcon, BugIcon, BookIcon, VersionIcon, HelpIcon } from "../icons";

interface SettingsMenuProps {
  showSettingsMenu: boolean;
  toggleSettingsMenu: (e: MouseEvent) => void;
  version: string;
}

export const SettingsMenu = ({ showSettingsMenu, toggleSettingsMenu, version }: SettingsMenuProps) => {
  return (
    <>
      {/* Help & Support Menu Button */}
      <div className="relative">
        <button
          id="settings-toggle"
          onClick={toggleSettingsMenu}
          className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 bg-gray-100 dark:bg-gray-700 rounded-full"
          title="Help & Support"
        >
          <HelpIcon />
        </button>
      </div>

      {/* Settings Dropdown Menu */}
      {showSettingsMenu && (
        <div
          className="absolute w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700 settings-menu"
          style={{
            top: "3.5rem",
            right: "3.5rem"
          }}
        >
          <a
            href="https://github.com/rjvim/meta-scan"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <span className="mr-2">
              <InfoIcon />
            </span>
            About
          </a>
          <a
            href="https://github.com/rjvim/meta-scan/issues/new"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <span className="mr-2">
              <BugIcon />
            </span>
            Raise an issue
          </a>
          <a
            href="https://github.com/rjvim/meta-scan#documentation"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <span className="mr-2">
              <BookIcon />
            </span>
            Documentation
          </a>
          <a
            href={`https://github.com/rjvim/meta-scan/releases/tag/v${version}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-4 py-2 text-sm text-blue-600 dark:text-blue-400 border-t border-gray-200 dark:border-gray-700 mt-1 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <div className="flex items-center">
              <span className="mr-2">
                <VersionIcon />
              </span>
              Version: {version}
            </div>
          </a>
        </div>
      )}
    </>
  );
};
