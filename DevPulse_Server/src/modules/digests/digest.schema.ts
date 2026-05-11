import { z } from 'zod';

export const generateDigestSchema = z.object({
  content: z.string().optional(),
});