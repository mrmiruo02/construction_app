import { z } from 'zod';

const deleteCommentPost = z
  .object({
    comment_id: z.number().optional(),
  })
  .strict();

type DeleteCommentPost = z.infer<typeof deleteCommentPost>;

export { deleteCommentPost, DeleteCommentPost };
