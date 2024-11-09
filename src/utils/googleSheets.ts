// src/services/googleSheets.ts

import { google } from 'googleapis';
import { Tariff } from 'types/tariffs.js';
import { logger } from './logger.js';

// Define Google Sheets scope
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

/**
 * Initializes Google Sheets API client with service account credentials.
 * @returns {google.sheets_v4.Sheets} Authenticated Google Sheets client.
 */
const getGoogleSheetsClient = () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_CREDENTIALS_PATH, // Path to your service account key file
    scopes: SCOPES,
  });

  return google.sheets({ version: 'v4', auth });
};

/**
 * Updates a specific sheet with tariffs data, sorted by the coefficient.
 * @param {string} spreadsheetId - The ID of the Google Sheets document.
 * @param {Tariff[]} tariffs - The data to write to the sheet.
 * @param {string} sheetName - The name of the sheet to update.
 */
export const updateGoogleSheet = async (
  spreadsheetId: string,
  tariffs: Tariff[],
  sheetName: string,
) => {
  const sheets = getGoogleSheetsClient();
  const sortedTariffs = tariffs.sort((a, b) => a.coefficient - b.coefficient);

  const rows = sortedTariffs.map((tariff) => [
    tariff.timestamp,
    tariff.coefficient,
    JSON.stringify(tariff.data),
  ]);

  const requestBody = {
    values: [['Timestamp', 'Coefficient', 'Data'], ...rows],
  };

  try {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${sheetName}!A1`,
      valueInputOption: 'RAW',
      requestBody, // Use requestBody instead of resource
    });
    logger.info(`Data successfully exported to Google Sheet: ${spreadsheetId}`);
  } catch (error) {
    logger.error('Error updating Google Sheet:', error);
    throw new Error('Failed to update Google Sheet');
  }
};
