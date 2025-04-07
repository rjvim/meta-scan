import { MoonIcon, SunIcon } from "../icons";
import { useRef } from "preact/hooks";

interface ThemeToggleProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export const ThemeToggle = ({ theme, toggleTheme }: ThemeToggleProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleToggleTheme = () => {
    if (!document.startViewTransition) {
      // Fallback for browsers that don't support view transitions
      toggleTheme();
      return;
    }

    // Get the button position for the animation origin
    const button = buttonRef.current;
    if (button) {
      const rect = button.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      // Set CSS variables for the animation
      document.documentElement.style.setProperty('--mask-position-x', `${x}px`);
      document.documentElement.style.setProperty('--mask-position-y', `${y}px`);
    }

    // Start the view transition
    document.startViewTransition(() => {
      toggleTheme();
    });
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleToggleTheme}
      className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 bg-gray-100 dark:bg-gray-700 rounded-full"
      title={`Theme: ${theme}`}
    >
      {theme === "dark" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};
