// src/middleware/errorHandler.ts

import { Request, Response, NextFunction } from 'express';
import { logger } from 'utils/logger.js';

/**
 * Custom Error class with status code.
 */
class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // Capture stack trace excluding constructor call
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Global error handling middleware.
 * Logs the error and sends a structured response.
 *
 * @param err - Error instance
 * @param req - Express request
 * @param res - Express response
 * @param next - Next function
 */
const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  logger.error(`Error: ${err.message}`, {
    method: req.method,
    url: req.originalUrl,
    stack: err.stack,
  });

  // Check if error is an instance of AppError
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  } else {
    // For unexpected errors
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};

export { errorHandler, AppError };
