import prisma from '../../config/db';
import { CreateMetricInput } from './metric.schema';

export const createMetricService = (data: CreateMetricInput) => {
  return prisma.metric.create({
    data,
  });
};
