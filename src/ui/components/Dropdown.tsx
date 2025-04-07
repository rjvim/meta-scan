import { JSX } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";

interface DropdownProps {
  show: boolean;
  children: JSX.Element | JSX.Element[];
  className?: string;
  style?: JSX.CSSProperties;
}

export const Dropdown = ({ show, children, className = "", style = {} }: DropdownProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const prevShow = useRef(show);

  useEffect(() => {
    if (!show && prevShow.current) {
      setIsClosing(true);
      const timer = setTimeout(() => setIsClosing(false), 200);
      return () => clearTimeout(timer);
    }
    prevShow.current = show;
    return undefined;
  }, [show]);

  if (!show && !isClosing) return null;

  return (
    <div
      className={`
        ${className}
        transform origin-top-left
        transition-all duration-200 ease-out
        ${show ? "opacity-100 scale-100" : "opacity-0 scale-95"}
      `}
      style={{
        ...style,
        pointerEvents: show ? "auto" : "none"
      }}
    >
      {children}
    </div>
  );
};
