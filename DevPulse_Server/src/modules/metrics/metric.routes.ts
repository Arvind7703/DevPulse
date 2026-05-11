import { Router } from 'express';
import {
  createMetricController,
  getEndpointBreakdownController,
  getMetricsSummaryController,
  getProjectMetricsController,
} from './metric.controller';
import { validateApiKey } from '../../middleware/apiKey.middleware';
import { userAuth } from '../../middleware/auth.middleware';

const route = Router();

route.post('/ingest', validateApiKey, createMetricController);

route.get('/:id', userAuth, getProjectMetricsController);

route.get('/:id/summary', userAuth, getMetricsSummaryController);

route.get('/:id/endpoints', userAuth, getEndpointBreakdownController);

export default route;
