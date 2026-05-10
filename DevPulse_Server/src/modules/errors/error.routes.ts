import { Router } from 'express';
import { createErrorController } from './error.controller';
import { validateApiKey } from '../../middleware/apiKey.middleware';

const route = Router();

route.post('ingest',validateApiKey, createErrorController);

export default route;
