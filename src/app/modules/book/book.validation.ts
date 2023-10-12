import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is Required!' }),
    author: z.string({ required_error: 'Author is Required!' }),
    price: z.number({ required_error: 'Price is Required!' }),
    genre: z.string({ required_error: 'Genre is Required!' }),
    publicationDate: z.string({
      required_error: 'Publication Date is Required!',
    }),
    categoryId: z.string({ required_error: 'Category Id is Required!' }),
  }),
});

export const BookValidation = {
  create,
};
