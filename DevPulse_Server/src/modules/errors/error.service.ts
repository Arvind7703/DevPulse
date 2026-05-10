import prisma from '../../config/db';
import { CreateErrorInput } from './error.schema';

export const createErrorService = (data: CreateErrorInput) => {
  return prisma.appError.create({
    data,
  });
};
