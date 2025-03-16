#!/usr/bin/env node

/**
 * inject-version.js
 *
 * This script extracts the next version number from Auto's dry-run output
 * and injects it into src/version-generated.ts file.
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Path to version file
const VERSION_FILE_PATH = path.join(__dirname, "src/version-generated.ts");

function getNextVersion() {
  try {
    // Execute auto shipit --dry-run and capture the output
    const output = execSync("npx auto shipit --dry-run 2>&1", {
      encoding: "utf8",
    });

    // Clean ANSI color codes from the output for better pattern matching
    const cleanedOutput = output.replace(/\x1B\[\d+m/g, "");

    console.log("Auto shipit dry-run output:");
    console.log("----------------------------");
    console.log(cleanedOutput);
    console.log("----------------------------");

    // Extract the version using regex
    // Look for "Would have published: X.Y.Z" pattern
    const publishMatch = cleanedOutput.match(
      /Would have published: ([0-9]+\.[0-9]+\.[0-9]+(?:-[a-zA-Z0-9.]+)?)/
    );

    if (publishMatch && publishMatch[1]) {
      return publishMatch[1];
    }

    // Alternative pattern: look for "Current version: X.Y.Z"
    const currentVersionMatch = cleanedOutput.match(
      /Current version: ([0-9]+\.[0-9]+\.[0-9]+)/
    );

    if (currentVersionMatch && currentVersionMatch[1]) {
      return currentVersionMatch[1];
    }

    // Read from package.json as fallback
    console.log(
      "Version not found in Auto output, falling back to package.json"
    );
    const packageJson = require("./package.json");
    return packageJson.version;
  } catch (error) {
    console.error("Error determining next version:", error.message);

    // Read from package.json as fallback
    console.log("Falling back to package.json version");
    const packageJson = require("./package.json");
    return packageJson.version;
  }
}

function generateVersionFile(version) {
  const content = `// This file is auto-generated by inject-version.js
// Do not modify this file directly

export const version = '${version}';
`;

  try {
    console.log(`META_SCAN_VERSION=${version}`);

    // Ensure directory exists
    // const dir = path.dirname(VERSION_FILE_PATH);
    // if (!fs.existsSync(dir)) {
    //   fs.mkdirSync(dir, { recursive: true });
    // }

    // Write the file
    // fs.writeFileSync(VERSION_FILE_PATH, content, "utf8");
    console.log(`Version ${version} injected into ${VERSION_FILE_PATH}`);

    return true;
  } catch (error) {
    console.error("Error generating version file:", error.message);
    return false;
  }
}

function commitAndPushVersion(version) {
  try {
    // Add the file to git
    execSync("git add src/version-generated.ts", { stdio: "inherit" });

    // Commit the file
    execSync(`git commit -m "chore: update version to ${version} [skip ci]"`, {
      stdio: "inherit",
    });

    // Push the changes
    execSync("git push origin HEAD", { stdio: "inherit" });

    console.log("Version file committed and pushed successfully");
    return true;
  } catch (error) {
    console.error("Error committing and pushing version file:", error.message);
    return false;
  }
}

// Main execution
const version = getNextVersion();

// Set GitHub Actions environment variable
if (process.env.GITHUB_ACTIONS) {
  fs.appendFileSync(process.env.GITHUB_ENV, `META_SCAN_VERSION=${version}\n`);
  console.log(`Version ${version} set as GitHub environment variable`);
} else {
  console.log(`META_SCAN_VERSION=${version}`);
}

// if (version) {
//   if (generateVersionFile(version)) {
//     // commitAndPushVersion(version);
//   }
// }
