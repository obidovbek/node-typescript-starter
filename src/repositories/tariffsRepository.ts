// src/repositories/tariffsRepository.ts

import TariffsModel from 'models/tariffsModel.js';
import { Tariff } from 'types/tariffs.js';

// import TariffsModel, { Tariff } from '../models/tariffsModel';

/**
 * Inserts or updates tariff data.
 * @param {Tariff[]} tariffs - An array of tariffs to insert or update.
 * @returns {Promise<void>}
 */
export const upsertTariffs = async (tariffs: Tariff[]): Promise<void> => {
  return await TariffsModel.upsertTariffs(tariffs);
};

/**
 * Retrieves all tariffs, sorted by coefficient.
 * @returns {Promise<Tariff[]>}
 */
export const getAllTariffs = async (): Promise<Tariff[]> => {
  return await TariffsModel.getAllTariffs();
};

/**
 * Retrieves tariffs by date.
 * @param {string} date - The date for which to retrieve tariffs (in 'YYYY-MM-DD' format).
 * @returns {Promise<Tariff[]>}
 */
export const getTariffsByDate = async (date: string): Promise<Tariff[]> => {
  return await TariffsModel.getTariffsByDate(date);
};
