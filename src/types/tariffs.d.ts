// src/types/tariffs.d.ts

/**
 * Type definitions for the Tariff model.
 * @typedef {Object} Tariff
 * @property {number} id - The unique identifier for the tariff.
 * @property {string} timestamp - The date the data was recorded.
 * @property {number} coefficient - The coefficient value.
 * @property {object} data - Additional data related to the tariff, stored as JSON.
 */
export interface Tariff {
  id?: number;
  timestamp: string;
  coefficient: number;
  data: Record<string, unknown>; // Stores other fields as a JSON object
}

/**
 * Type definition for the structure of data returned from the Wildberries API.
 * Customize based on the actual response from Wildberries API.
 * @typedef {Object} TariffData
 * @property {string} timestamp - The date the data was recorded.
 * @property {number} coefficient - The coefficient value.
 * @property {object} data - Additional data related to the tariff.
 */
export interface TariffData {
  timestamp: string;
  coefficient: number;
  data: Record<string, unknown>;
}
