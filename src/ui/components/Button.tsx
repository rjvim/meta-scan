import { JSX } from "preact";
import { forwardRef } from "preact/compat";

interface ButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "icon" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", isLoading, className = "", children, ...props }, ref) => {
    const baseStyles = "relative inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 ease-out hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100";
    
    const variants = {
      primary: "bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/35 dark:bg-purple-500 dark:hover:bg-purple-400 focus:ring-purple-500",
      secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700 shadow-sm hover:shadow dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 focus:ring-gray-500",
      icon: "w-6 h-6 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full shadow-sm hover:shadow dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 focus:ring-gray-500",
      danger: "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/25 hover:shadow-red-500/35 dark:bg-red-500 dark:hover:bg-red-400 focus:ring-red-500"
    };

    const sizes = {
      sm: "px-2.5 py-1.5 text-xs",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base"
    };

    const sizeClass = variant === "icon" ? "" : sizes[size];

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizeClass} ${className}
          before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity
          after:absolute after:inset-0 after:rounded-lg after:bg-gradient-to-r after:from-transparent after:to-white/5 after:opacity-0 hover:after:opacity-100 after:transition-opacity
        `}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">
          {isLoading && (
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          )}
          {children}
        </span>
      </button>
    );
  }
);
