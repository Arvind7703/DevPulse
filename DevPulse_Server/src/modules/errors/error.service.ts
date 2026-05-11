import prisma from '../../config/db';
import { CreateErrorInput } from './error.schema';

export const createErrorService = (
  data: CreateErrorInput & {
    projectId: string;
  },
) => {
  return prisma.appError.create({
    data,
  });
};

export const getProjectErrorsService = (
  projectId: string,
) => {
  return prisma.appError.findMany({
    where: {
      projectId,
    },
    orderBy: {
      lastSeen: 'desc',
    },
  });
};

export const resolveErrorService = (
  errorId: string,
) => {
  return prisma.appError.update({
    where: {
      id: errorId,
    },
    data: {
      resolved: true,
    },
  });
};