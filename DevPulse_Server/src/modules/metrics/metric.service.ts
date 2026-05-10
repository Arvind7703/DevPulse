import prisma from '../../config/db';

type CreateMetricServiceInput = {
  endpoint: string;
  method: string;
  statusCode: number;
  duration: number;
  projectId: string;
};

export const createMetricService = (data: CreateMetricServiceInput) => {
  return prisma.metric.create({
    data,
  });
};
