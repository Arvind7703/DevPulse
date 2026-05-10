import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Zod validation error
  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: err.issues,
    });

    return;
  }

  // Generic server error
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
};