"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.devpulseErrorHandler = exports.devpulse = void 0;
const devpulse = (config) => {
    return (req, res, next) => {
        const start = Date.now();
        res.on('finish', async () => {
            try {
                await fetch(`${config.serverUrl}/api/v1/metrics/ingest`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': config.apiKey,
                    },
                    body: JSON.stringify({
                        endpoint: req.originalUrl,
                        method: req.method,
                        statusCode: res.statusCode,
                        duration: Date.now() - start,
                    }),
                });
            }
            catch (error) {
                console.log('DevPulse SDK Error', error);
            }
        });
        next();
    };
};
exports.devpulse = devpulse;
const devpulseErrorHandler = (config) => {
    return async (err, req, res, next) => {
        try {
            await fetch(`${config.serverUrl}/api/v1/errors/ingest`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': config.apiKey,
                },
                body: JSON.stringify({
                    message: err.message,
                    stack: err.stack,
                }),
            });
        }
        catch (error) {
            console.log(error);
        }
        next(err);
    };
};
exports.devpulseErrorHandler = devpulseErrorHandler;
