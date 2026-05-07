import { Request, Response } from 'express';
import { registerService, loginService } from './auth.service';

export const registerController = async (req: Request, res: Response) => {
  try {
    const result = await registerService(req.body);

    res.status(201).json(result);
  } catch (err: any) {
    res.status(400).json(err.message);
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const result = await loginService(req.body);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(400).json(err.message);
  }
};
