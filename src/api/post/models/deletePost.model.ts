import { z } from 'zod';

const deletePost = z
  .object({
    post_id: z.number().optional(),
  })
  .strict();

type DeletePost = z.infer<typeof deletePost>;

export { deletePost, DeletePost };
