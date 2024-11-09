// src/config/database.ts

import knex, { Knex } from 'knex';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Knex configuration for PostgreSQL connection.
 * @type {Knex.Config}
 */
const knexConfig: Knex.Config = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '123456',
    database: process.env.DB_NAME || 'postgres',
  },
  pool: { min: 0, max: 10 },
  migrations: {
    tableName: 'knex_migrations',
    directory: './src/migrations',
  },
};

const db: Knex = knex(knexConfig);

/**
 * Test the database connection.
 * @returns {Promise<void>}
 */
export const connectDB = async (): Promise<void> => {
  try {
    await db.raw('SELECT 1+1 AS result');
  } catch (error) {
    throw error;
  }
};

export default db;
