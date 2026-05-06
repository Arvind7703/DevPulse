import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().max(12),
  email: z.string().email().max(20),
  password: z.string().min(6),
});

export const loginSchema = z.object({
  email: z.string().email().max(20),
  password: z.string(),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
