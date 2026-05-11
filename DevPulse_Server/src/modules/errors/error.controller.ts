import { Request, Response } from 'express';

import { createErrorSchema } from './error.schema';

import {
  createErrorService,
  getProjectErrorsService,
  resolveErrorService,
} from './error.service';

export const createErrorController = async (
  req: Request,
  res: Response,
) => {
  const validatedData =
    createErrorSchema.parse(req.body);

  const error = await createErrorService({
    ...validatedData,
    projectId: req.project!.id,
  });

  res.status(201).json({
    success: true,
    error,
  });
};

export const getProjectErrorsController =
  async (
    req: Request,
    res: Response,
  ) => {
    const errors =
      await getProjectErrorsService(
        req.params.id as string,
      );

    res.status(200).json({
      success: true,
      errors,
    });
  };

export const resolveErrorController =
  async (
    req: Request,
    res: Response,
  ) => {
    const error =
      await resolveErrorService(
        req.params.id as string,
      );

    res.status(200).json({
      success: true,
      error,
    });
  };