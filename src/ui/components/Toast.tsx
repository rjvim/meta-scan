import { h, JSX } from "preact";
import { useState, useEffect } from "preact/hooks";
import { cn } from "../../utils/cn";

interface ToastProps {
  message: string;
  duration?: number;
  type?: "info" | "success" | "error";
  onClose?: () => void;
}

export function Toast({ 
  message, 
  duration = 3000, 
  type = "info", 
  onClose 
}: ToastProps): JSX.Element {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) {
        setTimeout(onClose, 300); // Allow animation to complete
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const typeClasses = {
    info: "bg-blue-500",
    success: "bg-green-500",
    error: "bg-red-500"
  };

  return (
    <div
      className={cn(
        "fixed z-50 bottom-4 left-1/2 transform -translate-x-1/2",
        "px-4 py-2 rounded-lg shadow-lg text-white text-sm",
        "transition-all duration-300",
        typeClasses[type],
        visible ? "opacity-90" : "opacity-0 translate-y-2"
      )}
    >
      {message}
    </div>
  );
}

// Global toast management
let toastContainer: HTMLDivElement | null = null;
let currentToast: any = null;

export function showToast(message: string, type: "info" | "success" | "error" = "info", duration = 3000) {
  // Create container if it doesn't exist
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "meta-scan-toast-container";
    document.body.appendChild(toastContainer);
  }

  // Clear any existing toast
  if (currentToast) {
    document.body.removeChild(toastContainer);
    toastContainer = document.createElement("div");
    toastContainer.id = "meta-scan-toast-container";
    document.body.appendChild(toastContainer);
  }

  // Create a simple toast element
  const toast = document.createElement("div");
  toast.className = `fixed z-50 bottom-4 left-1/2 transform -translate-x-1/2 
                     px-4 py-2 rounded-lg shadow-lg text-white text-sm
                     transition-all duration-300 opacity-90
                     ${type === 'info' ? 'bg-blue-500' : type === 'success' ? 'bg-green-500' : 'bg-red-500'}`;
  toast.textContent = message;
  
  // Add to container
  toastContainer.appendChild(toast);
  currentToast = toast;
  
  // Remove after duration
  setTimeout(() => {
    if (toast && toastContainer) {
      toast.style.opacity = "0";
      toast.style.transform = "translate(-50%, 10px)";
      
      setTimeout(() => {
        if (toastContainer && toastContainer.contains(toast)) {
          toastContainer.removeChild(toast);
        }
        currentToast = null;
      }, 300);
    }
  }, duration);
}
