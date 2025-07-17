import { z } from 'zod';

const loginModel = z
  .object({
    email: z.string(),
    password: z.string(),
  })
  .strict();

type LoginModel = z.infer<typeof loginModel>;

export { loginModel, LoginModel };
