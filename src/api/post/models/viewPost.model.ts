import { z } from 'zod';

const viewPostModel = z
  .object({
    post_id: z.number().optional(),
    userID: z.number().optional(),
  })
  .strict();

type ViewPostModel = z.infer<typeof viewPostModel>;

export { viewPostModel, ViewPostModel };
