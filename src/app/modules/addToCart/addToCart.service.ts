import { AddToCart } from '@prisma/client';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { ENUM_USER_ROLE } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { prisma } from '../../../shared/prisma';

const insertIntoDB = async (
  data: AddToCart,
  token: string
): Promise<AddToCart> => {
  const user = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);

  const isUserExist = await prisma.user.findFirst({
    where: {
      id: user.userId,
    },
  });

  if (!isUserExist && user?.role !== ENUM_USER_ROLE.USER) {
    throw new ApiError(httpStatus.NOT_FOUND, "user doesn't exist!");
  }

  if (!data.userId) {
    data.userId = user.userId;
  }

  const isExistAddToCart = await prisma.addToCart.findFirst({
    where: { serviceId: data.serviceId, userId: user.userId },
  });

  if (isExistAddToCart) {
    throw new ApiError(httpStatus.CONFLICT, 'Already this service added!!!');
  }

  const result = await prisma.addToCart.create({
    data,
    include: {
      user: true,
      service: true,
    },
  });
  return result;
};

const getAddToCarts = async (token: string): Promise<AddToCart[]> => {
  const user = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
  console.log(user);
  

  const isExist = await prisma.user.findFirst({
    where: {
      id: user.userId,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "user doesn't exist!");
  }

  if (user.role === ENUM_USER_ROLE.USER) {
    const result = await prisma.addToCart.findMany({
      where: {
        userId: user.userId,
      },
      include: {
        user: true,
        service: true,
      },
    });
    return result;
  } else {
    const result = await prisma.addToCart.findMany({
      where: {},
      include: {
        user: true,
        service: true,
      },
    });
    return result;
  }
};

const getAddToCart = async (id: string): Promise<AddToCart | null> => {
  const result = await prisma.addToCart.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
      service: true,
    },
  });
  return result;
};

const deleteAddToCart = async (id: string): Promise<AddToCart | null> => {
  const result = await prisma.addToCart.delete({
    where: {
      id,
    },
    include: {
      user: true,
      service: true,
    },
  });
  return result;
};

export const AddToCartService = {
  insertIntoDB,
  getAddToCarts,
  getAddToCart,
  deleteAddToCart,
};
