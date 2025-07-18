import { z } from 'zod';

const viewPostModel = z
  .object({
    id: z.number().optional(),
    userID: z.number().optional(),
  })
  .strict();

type ViewPostModel = z.infer<typeof viewPostModel>;

export { viewPostModel, ViewPostModel };
