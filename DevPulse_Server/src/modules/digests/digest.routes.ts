import { Router } from 'express';

import {
  generateDigestController,
  getProjectDigestsController,
} from './digest.controller';

import { userAuth } from '../../middleware/auth.middleware';

const route = Router();

route.get(
  '/project/:id',
  userAuth,
  getProjectDigestsController,
);

route.post(
  '/project/:id/generate',
  userAuth,
  generateDigestController,
);

export default route;