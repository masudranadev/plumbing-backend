import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { prisma } from '../../../shared/prisma';

const insertIntoDB = async (data: User): Promise<User> => {
  const hashPassword = await bcrypt.hash(data.password, 12);
  data.password = hashPassword;
  const result = await prisma.user.create({ data });
  return result;
};

export const AdminService = {
  insertIntoDB,
};
