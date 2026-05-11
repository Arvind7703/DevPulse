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

export const getProjectMetricsService = async (
  projectId: string,
) => {
  return prisma.metric.findMany({
    where: {
      projectId,
    },
    orderBy: {
      timestamp: 'desc',
    },
  });
};

export const getMetricsSummaryService = async (
  projectId: string,
) => {
  const metrics = await prisma.metric.findMany({
    where: {
      projectId,
    },
  });

  const totalRequests = metrics.length;

  const avgLatency =
    metrics.reduce((acc, item) => acc + item.duration, 0) /
    (totalRequests || 1);

  const errorCount = metrics.filter(
    (item) => item.statusCode >= 400,
  ).length;

  const errorRate =
    totalRequests === 0
      ? 0
      : (errorCount / totalRequests) * 100;

  return {
    totalRequests,
    avgLatency,
    errorRate,
  };
};

export const getEndpointBreakdownService = async (
  projectId: string,
) => {
  const metrics = await prisma.metric.findMany({
    where: {
      projectId,
    },
  });

  const grouped: Record<
    string,
    {
      endpoint: string;
      count: number;
      avgLatency: number;
      errorCount: number;
      totalLatency: number;
    }
  > = {};

  for (const metric of metrics) {
    if (!grouped[metric.endpoint]) {
      grouped[metric.endpoint] = {
        endpoint: metric.endpoint,
        count: 0,
        avgLatency: 0,
        errorCount: 0,
        totalLatency: 0,
      };
    }

    grouped[metric.endpoint].count += 1;

    grouped[metric.endpoint].totalLatency +=
      metric.duration;

    if (metric.statusCode >= 400) {
      grouped[metric.endpoint].errorCount += 1;
    }
  }

  return Object.values(grouped).map((item) => ({
    endpoint: item.endpoint,
    requests: item.count,
    avgLatency:
      item.totalLatency / item.count,
    errorCount: item.errorCount,
  }));
};
