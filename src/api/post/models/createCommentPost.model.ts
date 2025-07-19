import { z } from 'zod';

const createCommentPost = z
  .object({
    content: z.string(),
    userID: z.number(),
    postID: z.number(),
  })
  .strict();

type CreateCommentPost = z.infer<typeof createCommentPost>;

export { createCommentPost, CreateCommentPost };
