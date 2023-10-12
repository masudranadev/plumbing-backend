import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is Required!' }),
    content: z.string({ required_error: 'Content is Required!' }),
    thumbnail: z.string({ required_error: 'Thumbnail is Required!' }),
    published: z
      .boolean({ required_error: 'published is Required!' })
      .optional(),
    authorId: z.string({ required_error: 'Author Id is Required!' }).optional(),
  }),
});

export const BlogValidation = {
    create
}
