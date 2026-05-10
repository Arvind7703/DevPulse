import { Request, Response } from 'express';
import { createErrorSchema } from './error.schema';
import { createErrorService } from './error.service';

export const createErrorController = (req: Request, res: Response) => {
  const validatedData = createErrorSchema.parse(req.body);
  const error = createErrorService(validatedData);

  res.status(201).json({ success: true, error });
};
