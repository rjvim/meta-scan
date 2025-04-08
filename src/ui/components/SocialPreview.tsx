import { h } from "preact";
import { useState } from "preact/hooks";
import { cn } from "../../utils/cn";
import type { MetadataResult } from "../../types";

interface SocialPreviewProps {
  metadata: MetadataResult;
  platform: "facebook" | "twitter" | "linkedin" | "pinterest";
}

export const SocialPreview = ({ metadata, platform }: SocialPreviewProps) => {
  // Select data based on platform preference
  const getTitle = (): string => {
    switch (platform) {
      case "facebook":
      case "linkedin":
      case "pinterest":
        return (
          metadata.opengraph?.["og:title"] ||
          metadata.general?.title ||
          "No title found"
        );
      case "twitter":
        return (
          metadata.twitter?.["twitter:title"] ||
          metadata.opengraph?.["og:title"] ||
          metadata.general?.title ||
          "No title found"
        );
    }
  };

  const getDescription = (): string => {
    switch (platform) {
      case "facebook":
      case "linkedin":
      case "pinterest":
        return (
          metadata.opengraph?.["og:description"] ||
          metadata.general?.["meta:description"] ||
          "No description found"
        );
      case "twitter":
        return (
          metadata.twitter?.["twitter:description"] ||
          metadata.opengraph?.["og:description"] ||
          metadata.general?.["meta:description"] ||
          "No description found"
        );
    }
  };

  const getImage = (): string | null => {
    switch (platform) {
      case "facebook":
      case "linkedin":
      case "pinterest":
        return metadata.opengraph?.["og:image"] || null;
      case "twitter":
        return (
          metadata.twitter?.["twitter:image"] ||
          metadata.opengraph?.["og:image"] ||
          null
        );
    }
  };

  const getDomain = (): string => {
    try {
      const url = metadata.opengraph?.["og:url"] || window.location.href;
      const domain = new URL(url).hostname;
      return domain.replace(/^www\./, "");
    } catch {
      return window.location.hostname.replace(/^www\./, "");
    }
  };

  // Get platform-specific styles and layouts
  const getPlatformStyles = () => {
    switch (platform) {
      case "facebook":
        return {
          container: "bg-[#f0f2f5] rounded-lg overflow-hidden shadow-md max-w-[500px]",
          card: "bg-white rounded-lg overflow-hidden border border-gray-300",
          imageContainer: "w-full h-[261px] bg-gray-200 overflow-hidden",
          contentContainer: "p-3",
          domain: "text-xs text-[#65676b] uppercase",
          title: "text-[#050505] font-semibold text-base leading-5 mt-1",
          description: "text-[#65676b] text-sm mt-1 line-clamp-3"
        };
      case "twitter":
        return {
          container: "bg-[#ffffff] dark:bg-[#15202b] rounded-lg shadow-md overflow-hidden max-w-[500px] border border-gray-200 dark:border-gray-800",
          card: "overflow-hidden",
          imageContainer: "w-full h-[261px] bg-gray-200 dark:bg-gray-700 overflow-hidden",
          contentContainer: "p-3",
          domain: "text-xs text-[#536471] dark:text-[#8899a6]",
          title: "text-[#0f1419] dark:text-[#ffffff] font-bold text-base leading-5 mt-1",
          description: "text-[#536471] dark:text-[#8899a6] text-sm mt-1 line-clamp-2"
        };
      case "linkedin":
        return {
          container: "bg-[#f3f2ef] rounded-lg shadow-md overflow-hidden max-w-[552px]",
          card: "bg-white overflow-hidden border border-[#e0dfdc]",
          imageContainer: "w-full h-[290px] bg-gray-200 overflow-hidden",
          contentContainer: "p-4",
          domain: "text-xs text-[#00000099]",
          title: "text-[#000000e6] font-semibold text-base leading-5 mt-1",
          description: "text-[#00000099] text-sm mt-1 line-clamp-2"
        };
      case "pinterest":
        return {
          container: "bg-[#efefef] rounded-lg shadow-md overflow-hidden max-w-[236px]",
          card: "bg-white overflow-hidden rounded-lg",
          imageContainer: "w-full h-[340px] bg-gray-200 overflow-hidden",
          contentContainer: "p-3",
          domain: "hidden",
          title: "text-[#333333] font-semibold text-sm leading-tight mt-1",
          description: "hidden"
        };
    }
  };

  const styles = getPlatformStyles();
  const title = getTitle();
  const description = getDescription();
  const image = getImage();
  const domain = getDomain();

  // Error state for image loading failures
  const [imageError, setImageError] = useState(false);

  return (
    <div className={cn("social-preview relative", styles.container)}>
      <div className="absolute top-2 right-2 z-10 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
        {platform.charAt(0).toUpperCase() + platform.slice(1)}
      </div>
      
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          {image && !imageError ? (
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-200 dark:bg-gray-700">
              <span className="text-gray-400 dark:text-gray-500 text-sm">No image available</span>
            </div>
          )}
        </div>
        
        <div className={styles.contentContainer}>
          <div className={styles.domain}>{domain}</div>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </div>
  );
};

/**
 * Tab-based container for all social previews
 */
export const SocialPreviewTabs = ({ metadata }: { metadata: MetadataResult }) => {
  const [activePlatform, setActivePlatform] = useState<"facebook" | "twitter" | "linkedin" | "pinterest">("facebook");
  
  const platforms = [
    { id: "facebook", label: "Facebook" },
    { id: "twitter", label: "Twitter" },
    { id: "linkedin", label: "LinkedIn" },
    { id: "pinterest", label: "Pinterest" }
  ];
  
  return (
    <div className="social-preview-container p-4">
      <div className="overflow-x-auto pb-2">
        <div className="tab-container flex min-w-max border-b border-gray-200 dark:border-gray-700 mb-4">
          {platforms.map(platform => (
            <button
              key={platform.id}
              className={cn(
                "px-4 py-2 text-sm font-medium whitespace-nowrap",
                activePlatform === platform.id
                  ? "border-b-2 border-purple-500 dark:border-purple-400 text-purple-600 dark:text-purple-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              )}
              onClick={() => setActivePlatform(platform.id as any)}
            >
              {platform.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="preview-container flex justify-center py-4 overflow-hidden">
        <div className="max-w-full overflow-x-auto">
          <SocialPreview metadata={metadata} platform={activePlatform} />
        </div>
      </div>
    </div>
  );
};
