import { z } from 'zod';

const reset = z.object({
  body: z.object({
    password: z.string({ required_error: 'Password is Required!' }),
  }),
});

export const UserValidation = {
  reset,
};
