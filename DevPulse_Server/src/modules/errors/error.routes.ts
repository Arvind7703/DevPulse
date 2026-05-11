import { Router } from 'express';

import {
  createErrorController,
  getProjectErrorsController,
  resolveErrorController,
} from './error.controller';

import { validateApiKey } from '../../middleware/apiKey.middleware';

import { userAuth } from '../../middleware/auth.middleware';

const route = Router();

route.post(
  '/ingest',
  validateApiKey,
  createErrorController,
);

route.get(
  '/project/:id',
  userAuth,
  getProjectErrorsController,
);

route.patch(
  '/:id/resolve',
  userAuth,
  resolveErrorController,
);

export default route;