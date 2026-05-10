import { NextFunction, Request, Response } from 'express';
import prisma from '../config/db';

export const validateApiKey = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const apiKey = req.headers['x-api-key'];

  // checking if api key is present or not
  if (!apiKey || typeof apiKey !== 'string') {
    res.status(401).json({ success: false, message: 'API key missing' });
    return;
  }

  const project = await prisma.project.findUnique({
    where: {
      apiKey,
    },
  });

  if (!project) {
    res.status(401).json({ success: false, message: 'Invalid API key' });
    return;
  }

  req.project = { id: project.id };
  next();
};
