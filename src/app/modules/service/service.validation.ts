import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is Required!' }),
    description: z.string({ required_error: 'description is Required!' }),
    price: z.number({ required_error: 'Price is Required!' }),
    image: z.string({ required_error: 'Image is Required!' }),
  }),
});

const update = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    image: z.string().optional(),
  }),
});

export const ServiceValidation = {
  create,
  update,
};
