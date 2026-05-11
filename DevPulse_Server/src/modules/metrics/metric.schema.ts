import { z } from 'zod';



export const createMetricSchema = z.object({
  endpoint: z.string().min(1),
  method: z.string().min(1),
  statusCode: z.number().int(),
  duration: z.number().positive(),
});

export type CreateMetricInput = z.infer<typeof createMetricSchema>;
