import { z } from 'zod';



export const createMetricSchema = z.object({
  endpoint: z.string(),
  method: z.string(),
  statusCode: z.number(),
  duration: z.number(),
});

export type CreateMetricInput = z.infer<typeof createMetricSchema>;
