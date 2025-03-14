/**
 * Toggle button component for MetaScan
 * Appears as a floating button on the page
 */
import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import type { Corner } from "../types";

interface ToggleButtonProps {
  position: Corner;
  isOpen: boolean;
  onToggle: () => void;
}

export function ToggleButton({
  position,
  isOpen,
  onToggle,
}: ToggleButtonProps) {
  const positionClass = `meta-scan-position-${position}`;

  return (
    <div
      className={`meta-scan-toggle ${positionClass} ${
        isOpen ? "meta-scan-toggle-active" : ""
      }`}
      onClick={onToggle}
      role="button"
      tabIndex={0}
      aria-label="Toggle MetaScan"
      title="Toggle MetaScan"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="16"></line>
        <line x1="8" y1="12" x2="16" y2="12"></line>
      </svg>
    </div>
  );
}
