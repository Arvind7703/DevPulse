import {
  Request,
  Response,
  NextFunction,
} from 'express';

import { DevPulseConfig } from './types';

export const monitor = (
  config: DevPulseConfig,
) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const start = Date.now();

    res.on('finish', async () => {
      try {
        await fetch(
          `${config.serverUrl}/api/v1/metrics/ingest`,
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json',

              'x-api-key':
                config.apiKey,
            },

            body: JSON.stringify({
              endpoint:
                req.originalUrl,

              method: req.method,

              statusCode:
                res.statusCode,

              duration:
                Date.now() - start,
            }),
          },
        );
      } catch (error) {}
    });

    next();
  };
};