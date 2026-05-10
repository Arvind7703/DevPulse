import { Router } from 'express';
import { createMetricController } from './metric.controller';

const route = Router();

route.post('/ingest', createMetricController);

export default route;
