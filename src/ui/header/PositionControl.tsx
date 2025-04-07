import { type Corner, type MetaScanUIState } from "~/types";
import { 
  TopLeftIcon, 
  TopRightIcon, 
  BottomLeftIcon, 
  BottomRightIcon, 
  PositionIcon 
} from "../icons";
import { Dropdown } from "../components/Dropdown";

interface PositionControlProps {
  showPositionMenu: boolean;
  togglePositionMenu: (e: MouseEvent) => void;
  changePosition: (position: Corner) => void;
  uiState: MetaScanUIState;
}

export const PositionControl = ({
  showPositionMenu,
  togglePositionMenu,
  changePosition,
  uiState,
}: PositionControlProps) => {
  // Determine dropdown position based on current panel position
  const getDropdownPosition = () => {
    return {
      position: 'absolute' as const,
      top: 'calc(100% + 0.5rem)',
      right: 0,
      zIndex: 9999
    };
  };

  return (
    <div className="relative">
      <button
        id="position-toggle"
        onClick={togglePositionMenu}
        className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 bg-gray-100 dark:bg-gray-700 rounded-full"
        title="Switch Position"
      >
        <PositionIcon />
      </button>

      {/* Position Dropdown Menu */}
      <Dropdown
        show={showPositionMenu}
        className="w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700"
        style={getDropdownPosition()}
      >
          <button
            onClick={() => {
              changePosition("top-left");
              togglePositionMenu(new MouseEvent('click'));
            }}
            className={`flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full ${uiState.position === "top-left" ? "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300" : ""}`}
          >
            <span className="mr-2">
              <TopLeftIcon />
            </span>
            Top Left
          </button>
          <button
            onClick={() => {
              changePosition("top-right");
              togglePositionMenu(new MouseEvent('click'));
            }}
            className={`flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full ${uiState.position === "top-right" ? "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300" : ""}`}
          >
            <span className="mr-2">
              <TopRightIcon />
            </span>
            Top Right
          </button>
          <button
            onClick={() => {
              changePosition("bottom-left");
              togglePositionMenu(new MouseEvent('click'));
            }}
            className={`flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full ${uiState.position === "bottom-left" ? "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300" : ""}`}
          >
            <span className="mr-2">
              <BottomLeftIcon />
            </span>
            Bottom Left
          </button>
          <button
            onClick={() => {
              changePosition("bottom-right");
              togglePositionMenu(new MouseEvent('click'));
            }}
            className={`flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full ${uiState.position === "bottom-right" ? "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300" : ""}`}
          >
            <span className="mr-2">
              <BottomRightIcon />
            </span>
            Bottom Right
          </button>
      </Dropdown>
    </div>
  );
};
