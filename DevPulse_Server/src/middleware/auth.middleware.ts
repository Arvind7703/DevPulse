import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const userAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    req.user = { id: decoded.id };
    next();
  } catch (err: any) {
    res.status(401).json('Invalid token');
  }
};
