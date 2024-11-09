// src/utils/logger.ts

import log4js from 'log4js';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Load environment variables from .env if needed
import dotenv from 'dotenv';
dotenv.config();

/**
 * Logger configuration using log4js.
 */
log4js.configure({
  appenders: {
    // Console appender for development
    console: {
      type: 'console',
    },
    // File appender for all logs
    file: {
      type: 'file',
      filename: path.join(__dirname, '../../logs/app.log'),
      maxLogSize: 10485760, // 10MB
      backups: 3,
      compress: true,
    },
    // File appender for errors
    errors: {
      type: 'file',
      filename: path.join(__dirname, '../../logs/errors.log'),
      maxLogSize: 10485760, // 10MB
      backups: 3,
      compress: true,
    },
    // Use 'logLevelFilter' to separate error logs
    errorFilter: {
      type: 'logLevelFilter',
      level: 'ERROR',
      appender: 'errors',
    },
  },
  categories: {
    default: {
      appenders: ['console', 'file', 'errorFilter'],
      level: process.env.LOG_LEVEL || 'DEBUG',
    },
  },
});

// Export the logger instance
export const logger = log4js.getLogger();

/**
 * Middleware for Express to log HTTP requests.
 */
export const httpLogger = log4js.connectLogger(logger, {
  level: 'auto',
  format: (_req, _res, format) =>
    format(
      `:remote-addr - ":method :url HTTP/:http-version" :status :content-length ":referrer" ":user-agent"`,
    ),
});
