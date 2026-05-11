import { Request, Response } from 'express';

import {
  generateDigestService,
  getProjectDigestsService,
} from './digest.service';

export const getProjectDigestsController =
  async (
    req: Request,
    res: Response,
  ) => {
    const digests =
      await getProjectDigestsService(
        req.params.id as string,
      );

    res.status(200).json({
      success: true,
      digests,
    });
  };

export const generateDigestController =
  async (
    req: Request,
    res: Response,
  ) => {
    const digest =
      await generateDigestService(
        req.params.id as string,
      );

    res.status(201).json({
      success: true,
      digest,
    });
  };