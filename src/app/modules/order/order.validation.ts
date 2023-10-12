import { z } from 'zod';

const orderedBookSchema = z.object({
  bookId: z.string().nonempty('Book ID is required'),
  quantity: z
    .number()
    .int()
    .min(1, { message: 'Quantity must be a positive integer' }),
});

const create = z.object({
  body:z.object({
    orderedBooks: z.array(orderedBookSchema).min(1, {
        message: 'At least one ordered book is required',
      }),
  }) 
});

export const OrderValidation = {
  create,
};
