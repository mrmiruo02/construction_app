import { z } from 'zod';

const usersCreate = z
  .object({
    name: z.string(),
    email: z.string(),
    password: z.string().optional(),
    provider: z.enum(['CUSTOM', 'GOOGLE', 'FACEBOOK']),
    role: z.enum(['CLIENT', 'ADMIN', 'CONTRUCTOR', 'SUPPLIER']),
  })
  .strict();

type UsersCreate = z.infer<typeof usersCreate>;

export { usersCreate, UsersCreate };
