import { z } from 'zod';

const editCommentPost = z
  .object({
    comment_id: z.number(),
    content: z.string(),
  })
  .strict();

type EditCommentPost = z.infer<typeof editCommentPost>;

export { editCommentPost, EditCommentPost };
