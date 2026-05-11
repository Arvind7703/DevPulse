import { Request, Response } from 'express';
import {
  createProjectService,
  deleteProjectService,
  getProjectService,
  getSingleProjectService,
  rotateApiKeyService,
  updateProjectService,
} from './project.service';

export const createProjectController = async (req: Request, res: Response) => {
  const project = await createProjectService(req.body.name, req.user!.id);
  res.status(201).json({ success: true, project });
};

export const getProjectController = async (req: Request, res: Response) => {
  const projects = await getProjectService(req.user!.id);
  res.status(200).json({ success: true, projects });
};

export const getSingleProjectController = async (
  req: Request,
  res: Response,
) => {
  const project = await getSingleProjectService(
    req.params.id as string,
    req.user!.id,
  );

  if (!project) {
    return res.status(404).json({
      success: false,
      message: 'Project not found',
    });
  }

  res.status(200).json({
    success: true,
    project,
  });
};

export const updateProjectController = async (req: Request, res: Response) => {
  const project = await updateProjectService(
    req.params.id as string,
    req.user!.id,
    req.body.name,
  );

  res.status(200).json({
    success: true,
    project,
  });
};

export const deleteProjectController = async (req: Request, res: Response) => {
  await deleteProjectService(req.params.id as string, req.user!.id);

  res.status(200).json({
    success: true,
    message: 'Project deleted successfully',
  });
};

export const rotateApiKeyController = async (req: Request, res: Response) => {
  const project = await rotateApiKeyService(
    req.params.id as string,
    req.user!.id,
  );

  res.status(200).json({
    success: true,
    apiKey: project.apiKey,
  });
};
