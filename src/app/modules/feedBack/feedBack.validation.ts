import { z } from 'zod';

const create = z.object({
  body: z.object({
    userId: z.string({ required_error: 'User Id is Required!' }),
    serviceId: z.string({ required_error: 'Service Id is Required!' }),
    comments: z.string({ required_error: 'Comments is Required!' }),
    suggestion: z.string({ required_error: 'Suggestion is Required!' }),
  }),
});

export const FeedBackValidation = {
  create,
};
