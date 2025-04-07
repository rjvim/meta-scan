import { MoonIcon, SunIcon } from "../icons";
import { useRef } from "preact/hooks";

interface ThemeToggleProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}



export const ThemeToggle = ({ theme, toggleTheme }: ThemeToggleProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleToggleTheme = () => {
    const button = buttonRef.current;
    if (!button) return;
    
    // Get button position for animation origin
    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Set CSS variables for the animation
    document.documentElement.style.setProperty('--mask-position-x', `${x}px`);
    document.documentElement.style.setProperty('--mask-position-y', `${y}px`);

    // Use View Transitions API if available
    if (typeof document.startViewTransition === 'function') {
      document.startViewTransition(() => {
        toggleTheme();
      });
    } else {
      // Fallback for browsers without View Transitions API
      toggleTheme();
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleToggleTheme}
      className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 bg-gray-100 dark:bg-gray-700 rounded-full shadow-sm hover:shadow transition-all duration-200"
      title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      {theme === "dark" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};
