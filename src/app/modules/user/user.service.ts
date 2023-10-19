/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import { userSearchableFields } from './user.constants';
import { IUserFilterRequest } from './user.interface';

const getUsers = async (
  filters: IUserFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<User[]>> => {
  const { page, size, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const { search, ...filterData } = filters;
  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: userSearchableFields.map(field => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(keys => ({
        [keys]: {
          equals: (filterData as any)[keys],
        },
      })),
    });
  }

  const whereCondition: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.user.findMany({
    where: whereCondition,
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : { createdAt: 'desc' },

    skip,
    take: size,
  });

  const total = await prisma.user.count({ where: whereCondition });
  const subTotal = await prisma.user.count();

  const totalPage = Math.ceil(subTotal / size);
  return {
    meta: {
      total,
      page,
      size,
      totalPage,
    },
    data: result,
  };
};

const getUser = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: { id },
  });

  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<User>
): Promise<User | null> => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const updatePassword = async (
  token: string,
  data: { password: string }
): Promise<User | null> => {
  const user = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found!');
  }
  const hashPassword = await bcrypt.hash(data.password, 12);
  data.password = hashPassword;
  const result = await prisma.user.update({
    where: {
      email: user?.userEmail,
    },
    data,
  });

  return result;
};

const deleteUser = async (id: string): Promise<User | null> => {
  const result = await prisma.user.delete({
    where: { id },
  });

  return result;
};

export const UserService = {
  updateUser,
  deleteUser,
  updatePassword,
  getUsers,
  getUser,
};
