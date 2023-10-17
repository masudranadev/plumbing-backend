import { z } from 'zod';

const create = z.object({
  body: z.object({
    fullName: z.string({ required_error: 'Name is Required!' }),
    email: z.string({ required_error: 'Email is Required!' }).email(),
    password: z.string({ required_error: 'Password is Required!' }),
    role: z.string({ required_error: 'Role is Required!' }),
    contactNo: z.string({ required_error: 'Contact No is Required!' }),
    address: z.string({ required_error: 'Address is Required!' }),
    profileImg: z.string({ required_error: 'Profile Img is Required!' }),
  }),
});

export const AdminValidation = {
  create,
};
