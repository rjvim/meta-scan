import { Fragment } from "preact";
import { memo } from "preact/compat";

interface SearchHighlighterProps {
  text: string;
  searchTerm: string;
  className?: string;
  highlightClassName?: string;
}

export const SearchHighlighter = memo(function SearchHighlighter({
  text,
  searchTerm,
  className = "",
  highlightClassName = "bg-yellow-200 dark:bg-yellow-700 rounded px-0.5",
}: SearchHighlighterProps) {
  if (!searchTerm || !text) {
    return <span className={className}>{text}</span>;
  }

  // Escape special regex characters
  const escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedSearchTerm})`, 'gi');
  const parts = text.split(regex);

  if (parts.length === 1) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className}>
      {parts.map((part, i) => {
        return regex.test(part) ? (
          <span key={i} className={highlightClassName}>
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        );
      })}
    </span>
  );
});
