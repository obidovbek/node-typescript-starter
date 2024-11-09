// src/scheduler/fetchDataScheduler.ts

import { fetchAndStoreTariffsCore } from 'controllers/tariffsController.js';
import cron from 'node-cron';
import { logger } from 'utils/logger.js';

/**
 * Initializes the data fetching scheduler.
 * Schedules an hourly job to fetch data from the Wildberries API and store it in PostgreSQL.
 */
export const startScheduler = () => {
  logger.info('Starting data fetch scheduler');

  // Schedule the job to run every hour
  cron.schedule('0 * * * *', async () => {
    try {
      logger.info('Running scheduled data fetch...');
      await fetchAndStoreTariffsCore();
      logger.info('Data fetch completed successfully');
    } catch (error) {
      logger.error('Error during scheduled data fetch:', error);
    }
  });
};
