import { z } from 'zod';

export const createErrorSchema = z.object({
  message: z.string(),
  stack: z.string().optional(),
});

export type CreateErrorInput = z.infer<typeof createErrorSchema>;
