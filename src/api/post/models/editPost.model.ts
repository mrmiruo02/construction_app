import { z } from 'zod';

const editPostModel = z
  .object({
    post_id: z.number(),
    header: z.string().optional(),
    content: z.string().optional(),
    image_url: z.string().optional(),
    userID: z.number(),
  })
  .strict();

type EditPostModel = z.infer<typeof editPostModel>;

export { editPostModel, EditPostModel };
