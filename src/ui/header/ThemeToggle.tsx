import { MoonIcon, SunIcon } from "../icons";
import { useRef } from "preact/hooks";

interface ThemeToggleProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export const ThemeToggle = ({ theme, toggleTheme }: ThemeToggleProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isAnimatingRef = useRef(false);

  const handleToggleTheme = () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    const button = buttonRef.current;
    if (!button) {
      toggleTheme();
      return;
    }

    // Get button position for the mask origin
    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Add the transition styles
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(`
      ::view-transition-group(root) {
        animation-duration: 750ms;
        animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      }

      ::view-transition-new(root),
      ::view-transition-old(root) {
        animation: none;
        mix-blend-mode: normal;
        transform-origin: ${x}px ${y}px;
      }

      ::view-transition-new(root) {
        mask: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="-50 -50 100 100"><defs><filter id="blur"><feGaussianBlur stdDeviation="5"/></filter></defs><circle cx="0" cy="0" r="25" fill="white" filter="url(%23blur)"/></svg>') 0 0 / 100% 100% no-repeat;
        mask-position: ${x}px ${y}px;
        animation: maskScale 750ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
      }

      ::view-transition-old(root) {
        animation: maskScale 750ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
      }

      @keyframes maskScale {
        0% {
          mask-size: 0px;
          mask-position: ${x}px ${y}px;
        }
        100% {
          mask-size: 10240px;
          mask-position: ${x - 5120}px ${y - 5120}px;
        }
      }
    `);

    // Apply the transition styles
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];

    // Start the transition
    if ('startViewTransition' in document) {
      // @ts-ignore - TypeScript doesn't know about startViewTransition
      document.startViewTransition(() => {
        toggleTheme();
      }).finished.finally(() => {
        isAnimatingRef.current = false;
      });
    } else {
      toggleTheme();
      // For non-supporting browsers, release the lock after animation duration
      setTimeout(() => {
        isAnimatingRef.current = false;
      }, 750);
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleToggleTheme}
      className={`
        w-6 h-6 flex items-center justify-center 
        relative overflow-hidden
        text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 
        bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600
        rounded-full shadow-sm hover:shadow-md
        transition-all duration-300
        transform hover:scale-110
      `}
      style={{
        transition: 'all 0.3s ease-out'
      }}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      <div className="relative z-10 transition-transform duration-500 hover:scale-110">
        {theme === "dark" ? <MoonIcon /> : <SunIcon />}
      </div>
    </button>
  );
};
