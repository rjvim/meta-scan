// Import package.json version using require
// @ts-ignore
const packageJson = require('../package.json');

// Export the version
export const version = packageJson.version;
