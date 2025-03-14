/**
 * Toggle button component for MetaScan
 */
import { h } from "preact";
import { Corner } from "../types";

interface ToggleButtonProps {
  position: Corner;
  onClick: () => void;
}

export function ToggleButton({ position, onClick }: ToggleButtonProps) {
  const positionClass = `meta-scan-position-${position}`;

  return (
    <div
      className={`meta-scan-toggle ${positionClass}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      M
    </div>
  );
}
