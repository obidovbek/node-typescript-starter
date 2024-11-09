// src/services/wildberriesService.ts

import axios from 'axios';
import { TariffData } from 'types/tariffs.js';
import { logger } from 'utils/logger.js';

/**
 * Fetches tariffs data from the Wildberries API.
 * @returns {Promise<TariffData[]>} - An array of TariffData objects.
 */
export const fetchWildberriesTariffs = async (): Promise<TariffData[]> => {
  try {
    const { data } = await axios.get(
      'https://dev.wildberries.ru/openapi/wb-tariffs#tag/Koefficienty-skladov',
      {
        headers: {
          Authorization: `Bearer ${process.env.WB_API_TOKEN}`,
        },
      },
    );

    // Transform the API data to match the TariffData structure
    const tariffs: TariffData[] = data.map((item: any) => ({
      timestamp: new Date().toISOString().split('T')[0], // Daily timestamp
      coefficient: item.coefficient, // Adjust this based on the actual response field names
      data: item,
    }));

    logger.info('Fetched data from Wildberries API successfully');
    return tariffs;
  } catch (error) {
    logger.error('Error fetching data from Wildberries API:', error);
    throw new Error('Failed to fetch data from Wildberries API');
  }
};
