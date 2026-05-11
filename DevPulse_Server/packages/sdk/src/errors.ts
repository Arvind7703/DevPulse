import {
  Request,
  Response,
  NextFunction,
} from 'express';

import { DevPulseConfig } from './types';

export const errors = (
  config: DevPulseConfig,
) => {
  return async (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      await fetch(
        `${config.serverUrl}/api/v1/errors/ingest`,
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',

            'x-api-key':
              config.apiKey,
          },

          body: JSON.stringify({
            message: err.message,
            stack: err.stack,
          }),
        },
      );
    } catch (error) {}

    next(err);
  };
};