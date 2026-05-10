import bcrypt from 'bcryptjs';
import prisma from '../../config/db';
import { LoginInput, RegisterInput } from './auth.schema';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../../utils/token.utils';
import jwt from 'jsonwebtoken';

export const registerService = async (data: RegisterInput) => {
  const { name, email, password } = data;

  // checking existing user
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    throw new Error('Email already exists please login');
  }

  // Hashing pass
  const passwordHash = await bcrypt.hash(password, 10);

  // Creating user
  const user = await prisma.user.create({
    data: { name, email, passwordHash },
  });

  // Creating token
  const accessToken = generateAccessToken({ id: user.id });
  const refreshToken = generateRefreshToken({ id: user.id });

  const { passwordHash: _, ...safeuser } = user;
  return { user: safeuser, accessToken, refreshToken };
};

export const loginService = async (data: LoginInput) => {
  const { email, password } = data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!existingUser) {
    throw new Error('User does not exists please register');
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    existingUser.passwordHash,
  );

  if (isPasswordValid) {
    const accessToken = generateAccessToken({ id: existingUser.id });
    const refreshToken = generateRefreshToken({ id: existingUser.id });

    const { passwordHash: _, ...safeUser } = existingUser;
    return { user: safeUser, accessToken, refreshToken };
  } else {
    throw new Error('Email or password incorrect');
  }
};

export const refreshTokenService = async (refreshToken: string) => {
  if (!refreshToken) {
    throw new Error('Refresh token missing');
  }

  const decoded = jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET!,
  ) as { id: string };

  const user = await prisma.user.findUnique({
    where: {
      id: decoded.id,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const accessToken = generateAccessToken({
    id: user.id,
  });

  return { accessToken };
};

export const getMeService = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const { passwordHash, ...safeUser } = user;

  return safeUser;
};
