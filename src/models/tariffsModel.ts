// src/models/tariffsModel.ts

import { Tariff } from 'types/tariffs.js';
import knex from '../config/database.js';

/**
 * TariffsModel class handles all operations related to the tariffs table.
 */
class TariffsModel {
  private tableName = 'tariffs';

  /**
   * Inserts or updates tariff data in the tariffs table.
   * @param tariffs - Array of Tariff objects to insert or update.
   * @returns {Promise<void>}
   */
  async upsertTariffs(tariffs: Tariff[]): Promise<void> {
    await knex.transaction(async (trx) => {
      for (const tariff of tariffs) {
        await trx(this.tableName)
          .insert(tariff)
          .onConflict(['timestamp', 'coefficient']) // Adjust based on unique fields
          .merge();
      }
    });
  }

  /**
   * Retrieves all tariffs from the tariffs table, sorted by coefficient.
   * @returns {Promise<Tariff[]>} - Array of Tariff objects.
   */
  async getAllTariffs(): Promise<Tariff[]> {
    return knex<Tariff>(this.tableName)
      .select('*')
      .orderBy('coefficient', 'asc');
  }

  /**
   * Retrieves tariffs for a specific date.
   * @param date - The date (in 'YYYY-MM-DD' format) to retrieve tariffs for.
   * @returns {Promise<Tariff[]>} - Array of Tariff objects for the specified date.
   */
  async getTariffsByDate(date: string): Promise<Tariff[]> {
    return knex<Tariff>(this.tableName)
      .select('*')
      .where('timestamp', date)
      .orderBy('coefficient', 'asc');
  }
}

export default new TariffsModel();
