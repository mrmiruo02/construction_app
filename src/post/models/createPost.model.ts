import { z } from 'zod';

const createPostModel = z
  .object({
    header: z.string(),
    content: z.string(),
    image_url: z.string(),
    userID: z.number(),
  })
  .strict();

type CreatePostModel = z.infer<typeof createPostModel>;

export { createPostModel, CreatePostModel };
