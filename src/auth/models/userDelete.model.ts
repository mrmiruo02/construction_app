import { z } from 'zod';

const usersDelete = z
  .object({
    id: z.number(),
  })
  .strict();

type UsersDelete = z.infer<typeof usersDelete>;

export { usersDelete, UsersDelete };
