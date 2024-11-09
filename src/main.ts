// src/main.ts

import { logger } from './utils/logger.js';
import createApp from './app.js';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  const app = await createApp();

  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
};

startServer().catch((err) => {
  logger.error('Failed to start server:', err);
  process.exit(1);
});
