import { z } from 'zod';

const create = z.object({
  body: z.object({
    review: z.string({ required_error: 'review is required' }),
    rating: z.number({ required_error: 'rating is required' }),
    userId: z.string({ required_error: 'user Id is required' }),
    serviceId: z.string({ required_error: 'servie id is required' }),
  }),
});
const update = z.object({
  body: z.object({
    review: z.string().optional(),
    rating: z.number().optional(),
    userId: z.string().optional(),
    serviceId: z.string().optional(),
  }),
});

export const ReviewAndRatingValidation = {
  create,
  update,
};
