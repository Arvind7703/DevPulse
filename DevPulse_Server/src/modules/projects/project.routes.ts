import { Router } from 'express';
import {
  createProjectController,
  getProjectController,
} from './project.controller';
import { userAuth } from './../../middleware/auth.middleware';

console.log("project route loaded")

const route = Router();

route.post('/create', userAuth, createProjectController);
route.get('/all', userAuth, getProjectController);

export default route
