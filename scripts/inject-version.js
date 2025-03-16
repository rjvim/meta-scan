// scripts/inject-version.js
const fs = require("fs");
const { execSync } = require("child_process");

// Get the version from auto's version command
let nextVersion;
try {
  // Run auto version to determine next version
  const autoOutput = execSync("npx auto version", { encoding: "utf8" }).trim();
  // Get current version from package.json
  const pkg = JSON.parse(fs.readFileSync("./package.json", "utf8"));

  // Calculate new version based on auto's output
  const semver = pkg.version.split(".");
  if (autoOutput === "patch") {
    semver[2] = parseInt(semver[2]) + 1;
  } else if (autoOutput === "minor") {
    semver[1] = parseInt(semver[1]) + 1;
    semver[2] = 0;
  } else if (autoOutput === "major") {
    semver[0] = parseInt(semver[0]) + 1;
    semver[1] = 0;
    semver[2] = 0;
  }

  nextVersion = semver.join(".");
  console.log(`Next version: ${nextVersion}`);

  // Create a version-generated.ts file
  const content = `// Auto-generated file - do not edit\nexport const version = '${nextVersion}';\n`;
  fs.writeFileSync("./src/version-generated.ts", content);

  // Commit the generated file
  execSync("git add ./src/version-generated.ts");
  execSync('git commit -m "bump: save version for release"');

  console.log("Version file generated and committed");
} catch (error) {
  console.error("Error generating version file:", error);
  process.exit(1);
}
