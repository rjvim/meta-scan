import { defineConfig } from "tsup";
import fs from "fs";
import path from "path";

const banner = `/**
 * MetaScan - Metadata Extraction Tool
 * Copyright (c) ${new Date().getFullYear()}
 * MIT License
 */`;

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
  },
]);
