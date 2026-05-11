import { Router } from 'express';
import {
  createProjectController,
  deleteProjectController,
  getProjectController,
  getSingleProjectController,
  rotateApiKeyController,
  updateProjectController,
} from './project.controller';
import { userAuth } from './../../middleware/auth.middleware';


const route = Router();

route.post('/', userAuth, createProjectController);
route.get('/', userAuth, getProjectController);
route.get('/:id', userAuth, getSingleProjectController);

route.patch('/:id', userAuth, updateProjectController);

route.delete('/:id', userAuth, deleteProjectController);

route.post('/:id/rotate-key', userAuth, rotateApiKeyController);

export default route
