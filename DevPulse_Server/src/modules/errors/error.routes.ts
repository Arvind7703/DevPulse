import { Router } from 'express';
import { createErrorController } from './error.controller';

const route = Router();

route.post('ingest', createErrorController);

export default route;
