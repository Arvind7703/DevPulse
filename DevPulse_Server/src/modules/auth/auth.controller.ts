import { Request, Response } from 'express';
import {
  registerService,
  loginService,
  refreshTokenService,
  getMeService,
} from './auth.service';
import { loginSchema, registerSchema } from './auth.schema';

export const registerController = async (req: Request, res: Response) => {
  try {
    const validatedData = registerSchema.parse(req.body);

    const result = await registerService(validatedData);

    res.status(201).json(result);
  } catch (err: any) {
    res.status(400).json(err.message);
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const validatedData = loginSchema.parse(req.body);

    const result = await loginService(validatedData);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(400).json(err.message);
  }
};

export const refreshTokenController = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    const result = await refreshTokenService(refreshToken);

    res.status(200).json(result);
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const meController = async (req: Request, res: Response) => {
  try {
    const user = await getMeService(req.user!.id);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
