import prisma from '../../config/db';

export const createProjectService = async (name: string, userId: string) => {
  return prisma.project.create({
    data: {
      name,
      userId,
    },
  });
};

export const getProjectService = async (userId: string) => {
  return prisma.project.findMany({
    where: {
      userId,
    },
  });
};
