import { useState } from "preact/hooks";
import { cn } from "../utils/cn";

// Icons (simplified for the artifact)
const RefreshIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M3 21v-5h5" />
  </svg>
);

const CopyIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

// Component for metadata item display
const MetadataItem = ({ label, value, copyable = true }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!value) return null;

  return (
    <div className="mb-3 group">
      <div className="flex items-center justify-between">
        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
          {label}
        </div>
        {copyable && (
          <button
            onClick={handleCopy}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            aria-label={`Copy ${label}`}
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
          </button>
        )}
      </div>
      <div className="text-sm break-words text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 p-2 rounded">
        {value}
      </div>
    </div>
  );
};

// Component for metadata preview image
const MetadataImage = ({ src, alt }) => {
  const [error, setError] = useState(false);

  if (!src || error) return null;

  return (
    <div className="mb-4">
      <div className="bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
        <div className="relative aspect-video flex items-center justify-center p-2">
          <img
            src={src}
            alt={alt || "Preview Image"}
            className="max-h-full max-w-full object-contain"
            onError={() => setError(true)}
          />
        </div>
      </div>
      <p className="text-xs text-center mt-1 text-gray-500 dark:text-gray-400">
        Preview Image
      </p>
    </div>
  );
};

// Component for metadata section
const MetadataSection = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="text-sm font-semibold mb-3 text-purple-700 dark:text-purple-400 border-b border-gray-200 dark:border-gray-700 pb-1">
      {title}
    </h3>
    <div className="space-y-2">{children}</div>
  </div>
);

// Main metadata panel component
const MetadataPanel = ({ metadata, refreshMetadata, theme = "light" }) => {
  if (!metadata) return null;

  return (
    <div
      className={cn(
        "p-5 overflow-y-auto max-h-[70vh] scrollbar-thin",
        "bg-white dark:bg-gray-900",
        "text-black dark:text-white",
        "transition-colors duration-200",
        theme === "dark" ? "dark" : ""
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-mono text-base font-bold">MetaScan Results</h2>
        <button
          onClick={refreshMetadata}
          className="p-1.5 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
          aria-label="Refresh Metadata"
        >
          <RefreshIcon />
        </button>
      </div>

      <MetadataImage
        src={metadata.opengraph?.image}
        alt={metadata.opengraph?.title || metadata.general?.title}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <MetadataSection title="General">
            <MetadataItem label="Title" value={metadata.general?.title} />
            <MetadataItem
              label="Description"
              value={metadata.general?.description}
            />
            <MetadataItem label="Author" value={metadata.general?.author} />
            <MetadataItem
              label="Keywords"
              value={metadata.general?.keywords?.join(", ")}
            />
          </MetadataSection>

          <MetadataSection title="Technical">
            <MetadataItem label="Charset" value={metadata.technical?.charset} />
            <MetadataItem
              label="Viewport"
              value={metadata.technical?.viewport}
            />
            <MetadataItem
              label="Language"
              value={metadata.technical?.language}
            />
            <MetadataItem
              label="Canonical URL"
              value={metadata.technical?.canonical}
            />
            <MetadataItem label="Robots" value={metadata.technical?.robots} />
          </MetadataSection>
        </div>

        <div>
          <MetadataSection title="Open Graph">
            <MetadataItem label="Title" value={metadata.opengraph?.title} />
            <MetadataItem
              label="Description"
              value={metadata.opengraph?.description}
            />
            <MetadataItem label="URL" value={metadata.opengraph?.url} />
            <MetadataItem label="Type" value={metadata.opengraph?.type} />
            <MetadataItem
              label="Site Name"
              value={metadata.opengraph?.siteName}
            />
          </MetadataSection>

          <MetadataSection title="Twitter Card">
            <MetadataItem label="Card" value={metadata.twitter?.card} />
            <MetadataItem label="Title" value={metadata.twitter?.title} />
            <MetadataItem
              label="Description"
              value={metadata.twitter?.description}
            />
            <MetadataItem label="Site" value={metadata.twitter?.site} />
            <MetadataItem label="Creator" value={metadata.twitter?.creator} />
          </MetadataSection>
        </div>
      </div>

      {metadata.structured && metadata.structured.length > 0 && (
        <MetadataSection title="Structured Data">
          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto">
            <pre className="text-xs">
              {JSON.stringify(metadata.structured, null, 2)}
            </pre>
          </div>
        </MetadataSection>
      )}

      <div className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
        Data extracted at {new Date(metadata.extractedAt).toLocaleTimeString()}
      </div>
    </div>
  );
};

export default MetadataPanel;
