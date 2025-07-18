import { z } from 'zod';

const usersCreate = z
  .object({
    name: z.string(),
    email: z.string(),
    password: z.string().optional(),
    provider: z.enum(['custom', 'google', 'facebook', 'twitter']),
    role: z.enum(['client', 'admin', 'contructor', 'supplier']),
  })
  .strict();

type UsersCreate = z.infer<typeof usersCreate>;

export { usersCreate, UsersCreate };
