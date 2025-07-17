import { z } from 'zod';

const usersUpdate = z
  .object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    password: z.string(),
    role: z.enum(['CONTRACTOR', 'ADMIN', 'CLIENT']),
  })
  .strict();

type UsersUpdate = z.infer<typeof usersUpdate>;

export { usersUpdate, UsersUpdate };
