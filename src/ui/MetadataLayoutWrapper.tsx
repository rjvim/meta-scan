import type { MetadataResult } from "~/types";
import MetadataLayout from "./MetadataLayout"; // Simple cards/tabs layout

/**
 * Wrapper component to switch between different layout implementations
 */
const MetadataLayoutWrapper = ({
  metadata,
  refreshMetadata,
  theme = "light",
}: {
  metadata: MetadataResult | null;
  refreshMetadata: () => void;
  theme?: "light" | "dark";
}) => {
  if (!metadata) return null;

  return (
    <MetadataLayout
      metadata={metadata}
      refreshMetadata={refreshMetadata}
      theme={theme as "light" | "dark"}
    />
  );
};

export default MetadataLayoutWrapper;
