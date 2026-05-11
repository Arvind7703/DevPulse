import { Request, Response, NextFunction } from 'express';
import { DevPulseConfig } from './types';
export declare const devpulse: (config: DevPulseConfig) => (req: Request, res: Response, next: NextFunction) => void;
export declare const devpulseErrorHandler: (config: DevPulseConfig) => (err: any, req: Request, res: Response, next: NextFunction) => Promise<void>;
