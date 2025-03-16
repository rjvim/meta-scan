import { defineConfig } from "tsup";
import fs from "fs";
import path from "path";

const banner = `/**
 * MetaScan - Metadata Extraction Tool
 * Copyright (c) ${new Date().getFullYear()}
 * MIT License
 */`;

// Read the processed CSS file directly
const inlineProcessedCss = () => {
  try {
    const cssPath = path.resolve(__dirname, "./src/ui/styles.processed.css");
    if (fs.existsSync(cssPath)) {
      return fs.readFileSync(cssPath, "utf8");
    }
    console.warn(
      "Warning: styles.processed.css not found, is the CSS build step missing?"
    );
    return "";
  } catch (err) {
    console.error("Error reading processed CSS:", err);
    return "";
  }
};

export default defineConfig([
  // Main library builds
  {
    entry: ["./src/index.ts", "./src/auto.ts"],
    format: ["cjs", "esm"],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    banner: {
      js: banner,
    },
    env: {
      NODE_ENV: process.env.NODE_ENV || "development",
    },
    loader: {
      ".css": "text",
    },
    onSuccess: async () => {
      console.log("Build completed, ensuring CSS is bundled properly...");
    },
    outDir: "./dist",
  },
  // Browser bundle (IIFE)
  {
    entry: ["./src/auto.ts"],
    format: ["iife"],
    globalName: "MetaScan",
    minify: process.env.NODE_ENV === "production",
    sourcemap: true,
    outExtension: () => ({
      js: ".global.js",
    }),
    banner: {
      js: banner,
    },
    env: {
      NODE_ENV: process.env.NODE_ENV || "development",
    },
    loader: {
      ".css": "text",
    },
    outDir: "./dist",
    esbuildOptions(options) {
      // Ensure the CSS is properly processed and included
      options.define = {
        ...options.define,
        "process.env.INLINE_CSS": JSON.stringify(inlineProcessedCss()),
        "window.META_SCAN_VERSION": JSON.stringify(
          process.env.META_SCAN_VERSION || require("./package.json").version
        ),
      };
    },
  },
]);
