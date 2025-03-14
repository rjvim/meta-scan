/**
 * logger.ts - Centralized logging utility for MetaScan
 *
 * Features:
 * - Configurable log levels
 * - Prefixed logs for easy filtering
 * - Environment-aware (development vs production)
 * - Easy to find/replace pattern
 */

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  NONE = 4,
}

interface LoggerOptions {
  prefix: string;
  level: LogLevel;
  enabled: boolean;
}

const DEFAULT_OPTIONS: LoggerOptions = {
  prefix: "MetaScan",
  level: process.env.NODE_ENV === "production" ? LogLevel.WARN : LogLevel.DEBUG,
  enabled: process.env.NODE_ENV !== "production",
};

class Logger {
  private options: LoggerOptions;

  constructor(options: Partial<LoggerOptions> = {}) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
  }

  /**
   * Configure logger settings
   */
  configure(options: Partial<LoggerOptions>): void {
    this.options = { ...this.options, ...options };
  }

  /**
   * Enable or disable logging
   */
  setEnabled(enabled: boolean): void {
    this.options.enabled = enabled;
  }

  /**
   * Set minimum log level
   */
  setLevel(level: LogLevel): void {
    this.options.level = level;
  }

  /**
   * Debug level logging (verbose)
   */
  debug(...args: any[]): void {
    if (!this.options.enabled || this.options.level > LogLevel.DEBUG) return;
    console.debug(`[${this.options.prefix}:debug]`, ...args);
  }

  /**
   * Info level logging (standard information)
   */
  info(...args: any[]): void {
    if (!this.options.enabled || this.options.level > LogLevel.INFO) return;
    console.info(`[${this.options.prefix}:info]`, ...args);
  }

  /**
   * Warning level logging (potential issues)
   */
  warn(...args: any[]): void {
    if (!this.options.enabled || this.options.level > LogLevel.WARN) return;
    console.warn(`[${this.options.prefix}:warn]`, ...args);
  }

  /**
   * Error level logging (actual errors)
   */
  error(...args: any[]): void {
    if (!this.options.enabled || this.options.level > LogLevel.ERROR) return;
    console.error(`[${this.options.prefix}:error]`, ...args);
  }

  /**
   * Log with specific level
   */
  log(level: LogLevel, ...args: any[]): void {
    switch (level) {
      case LogLevel.DEBUG:
        this.debug(...args);
        break;
      case LogLevel.INFO:
        this.info(...args);
        break;
      case LogLevel.WARN:
        this.warn(...args);
        break;
      case LogLevel.ERROR:
        this.error(...args);
        break;
    }
  }

  /**
   * Create child logger with different prefix
   */
  child(subPrefix: string): Logger {
    return new Logger({
      ...this.options,
      prefix: `${this.options.prefix}:${subPrefix}`,
    });
  }
}

// Create default instance
const logger = new Logger();

// Export default instance and class for creating custom loggers
export { logger, Logger };

// To find and replace all logger.log in your editor:
// Find: logger.log\((.*)\);
// Replace: logger.debug($1);

// For console.warn and console.error:
// Find: console.warn\((.*)\);
// Replace: logger.warn($1);

// Find: console.error\((.*)\);
// Replace: logger.error($1);
