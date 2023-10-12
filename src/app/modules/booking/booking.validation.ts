import { z } from 'zod';

const create = z.object({
  body: z.object({
    userId: z.string().optional(),
    serviceId: z.string({ required_error: 'Service Id is Required!' }),
    status: z.string().optional(),
    date: z.string({ required_error: 'Date is required!' }),
  }),
});

export const BookingValidation = {
  create,
};
