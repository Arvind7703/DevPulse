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

export const generateDigestService = async (
  projectId: string,
) => {
  const metrics = await prisma.metric.findMany({
    where: {
      projectId,
    },
  });

  const errors = await prisma.appError.findMany({
    where: {
      projectId,
      resolved: false,
    },
  });

  const totalRequests = metrics.length;

  const avgLatency =
    metrics.reduce(
      (acc, item) => acc + item.duration,
      0,
    ) / (totalRequests || 1);

  const errorRate =
    totalRequests === 0
      ? 0
      : (errors.length / totalRequests) * 100;

  const content = `
This week your app handled ${totalRequests} requests
with an average latency of ${avgLatency.toFixed(
    2,
  )}ms and an error rate of ${errorRate.toFixed(
    2,
  )}%.
`;

  return prisma.digest.create({
    data: {
      projectId,
      content,
      weekStart: new Date(),
    },
  });
};