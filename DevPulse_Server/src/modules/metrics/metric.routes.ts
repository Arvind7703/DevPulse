import { Router } from 'express';
import { createMetricController } from './metric.controller';
import { validateApiKey } from '../../middleware/apiKey.middleware';

const route = Router();

route.post('/ingest', validateApiKey, createMetricController);

export default route;
