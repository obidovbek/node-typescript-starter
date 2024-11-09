// src/controllers/tariffsController.ts

import { Request, Response, NextFunction } from 'express';
import { AppError } from 'middlewares/errorHandler.js';
import {
  getAllTariffs,
  upsertTariffs,
} from 'repositories/tariffsRepository.js';
import { fetchWildberriesTariffs } from 'services/wildberriesService.js';
import { logger } from 'utils/logger.js';

/**
 * Core function to fetch and store tariffs, used by both the scheduler and route.
 */
export const fetchAndStoreTariffsCore = async () => {
  try {
    const tariffs = await fetchWildberriesTariffs();
    await upsertTariffs(tariffs);
    logger.info('Tariffs data fetched and stored successfully');
  } catch (error) {
    logger.error('Error in fetchAndStoreTariffsCore:', error);
    throw error;
  }
};

/**
 * Fetches tariff data from the Wildberries API and stores it in the database.
 * Used as a route handler in Express.
 */
export const fetchAndStoreTariffs = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await fetchAndStoreTariffsCore();
    res
      .status(200)
      .json({ message: 'Tariffs data fetched and stored successfully' });
  } catch (error) {
    next(new AppError('Failed to fetch and store tariffs data', 500));
  }
};
/**
 * Retrieves all tariff data from the database.
 * @async
 */
export const getTariffs = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tariffs = await getAllTariffs();
    res.status(200).json({ tariffs });
  } catch (error) {
    logger.error('Error retrieving tariffs data:', error);
    next(new AppError('Failed to retrieve tariffs data', 500));
  }
};
