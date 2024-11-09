// src/routes/tariffsRoutes.ts

import {
  fetchAndStoreTariffs,
  getTariffs,
} from 'controllers/tariffsController.js';
import { Router } from 'express';

const router = Router();

// Route to fetch and store tariff data (could be restricted to scheduled tasks only)
router.get('/fetch', fetchAndStoreTariffs);

// Route to retrieve stored tariff data
router.get('/', getTariffs);

export default router;
