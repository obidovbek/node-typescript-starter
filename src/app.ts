// src/app.ts

import express, { Application } from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import { logger, httpLogger } from './utils/logger.js';
import { AppError, errorHandler } from 'middlewares/errorHandler.js';
import tariffsRoutes from './routes/tariffsRoutes.js';
import { startScheduler } from 'scheduler/fetchDataScheduler.js';

dotenv.config();

const createApp = async (): Promise<Application> => {
  const app = express();

  // Middleware to parse JSON requests
  app.use(express.json());

  // HTTP request logger
  app.use(httpLogger);

  // Database connection
  await connectDB()
    .then(() => {
      logger.info('Connected to PostgreSQL database');
      // Start any scheduled data fetching
      startScheduler();
    })
    .catch((error) => {
      logger.error('Database connection failed:', error);
      process.exit(1); // Exit the process if the database connection fails
    });

  // Routes setup
  app.use('/api/tariffs', tariffsRoutes);

  // Example route for testing
  app.get('/example', (_req, _res, next) => {
    next(new AppError('Example Not Found', 404));
  });

  // Error handling middleware
  app.use(errorHandler);

  return app;
};

export default createApp;
