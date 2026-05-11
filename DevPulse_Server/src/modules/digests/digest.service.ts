import prisma from '../../config/db';

export const getProjectDigestsService = (
  projectId: string,
) => {
  return prisma.digest.findMany({
    where: {
      projectId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const generateDigestService = (
  projectId: string,
) => {
  return prisma.digest.create({
    data: {
      projectId,

      content:
        'This week your app performance remained stable with low error rates and healthy API response times.',

      weekStart: new Date(),
    },
  });
};