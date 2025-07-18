import { z } from 'zod';

const deletePost = z
  .object({
    id: z.number().optional(),
  })
  .strict();

type DeletePost = z.infer<typeof deletePost>;

export { deletePost, DeletePost };
