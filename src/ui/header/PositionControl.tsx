import { type Corner, type MetaScanUIState } from "~/types";
import { 
  TopLeftIcon, 
  TopRightIcon, 
  BottomLeftIcon, 
  BottomRightIcon, 
  PositionIcon 
} from "../icons";

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
    const position = uiState.position;

    // Position dropdown within the panel
    const styles = {
      position: 'absolute' as const,
      zIndex: 9999
    };

    // For bottom positions, show dropdown at top of panel
    if (position === 'bottom-left' || position === 'bottom-right') {
      return {
        ...styles,
        top: '3rem',
        left: '1rem'
      };
    } 
    // For top positions, show dropdown at bottom of panel
    else {
      return {
        ...styles,
        top: '3rem',
        left: '1rem'
      };
    }
  };

  return (
    <div className="relative">
      <button
        id="position-toggle"
        onClick={togglePositionMenu}
        className={`w-6 h-6 flex items-center justify-center rounded-full ${
          showPositionMenu
            ? "bg-purple-100 dark:bg-purple-700 text-purple-600 dark:text-purple-400"
            : "text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 bg-gray-100 dark:bg-gray-700"
        }`}
        title="Switch Position"
      >
        <PositionIcon />
      </button>

      {/* Position Dropdown Menu */}
      {showPositionMenu && (
        <div
          className="w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 border border-gray-200 dark:border-gray-700 position-menu"
          style={getDropdownPosition()}
        >
          <button
            onClick={() => {
              changePosition("top-left");
              togglePositionMenu(new MouseEvent('click'));
            }}
            className={`flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left ${
              uiState.position === "top-left"
                ? "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300"
                : ""
            }`}
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
            className={`flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left ${
              uiState.position === "top-right"
                ? "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300"
                : ""
            }`}
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
            className={`flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left ${
              uiState.position === "bottom-left"
                ? "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300"
                : ""
            }`}
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
            className={`flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left ${
              uiState.position === "bottom-right"
                ? "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300"
                : ""
            }`}
          >
            <span className="mr-2">
              <BottomRightIcon />
            </span>
            Bottom Right
          </button>
        </div>
      )}
    </div>
  );
};
