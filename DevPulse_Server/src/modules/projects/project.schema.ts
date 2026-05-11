import { z } from 'zod';

export const createProjectSchema = z.object({
  name: z.string().min(3).max(30),
});

export const updateProjectSchema = z.object({
  name: z.string().min(3).max(30),
});
