import { Request, Response } from 'express';
import { createProjectService, getProjectService } from './project.service';

export const createProjectController = async (req: Request, res: Response) => {
  const project = await createProjectService(req.body.name, req.user!.id);
  res.status(201).json({ success: true, project });
};

export const getProjectController = async (req: Request, res: Response) => {
  const projects = await getProjectService(req.user!.id);
  res.status(200).json({ success: true, projects });
};
