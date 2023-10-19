import { Prisma, ReviewAndRating } from '@prisma/client';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import { reviewAndRatingSearchableFields } from './reviewAndRating.constants';
import { IReviewAndRatingFilterRequest } from './reviewAndRating.interface';

const insertIntoDB = async (
  token: string,
  data: ReviewAndRating
): Promise<ReviewAndRating> => {
  const user = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);

  const isExist = await prisma.user.findFirst({
    where: {
      id: user.userId,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "user doesn't exist!");
  }

  if (!data.userId) {
    data.userId = user.userId;
  }

  const result = await prisma.reviewAndRating.create({
    data,
    include: {
      user: true,
      service: true,
    },
  });
  return result;
};

const getReviewAndRatings = async (
  filters: IReviewAndRatingFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<ReviewAndRating[]>> => {
  const { page, size, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const { search, ...filterData } = filters;
  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: reviewAndRatingSearchableFields.map(field => ({
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

  const whereCondition: Prisma.ReviewAndRatingWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.reviewAndRating.findMany({
    where: whereCondition,
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : { createdAt: 'desc' },

    skip,
    take: size,
    include: {
      user: true,
      service: true,
    },
  });

  const total = await prisma.reviewAndRating.count({ where: whereCondition });

  const subTotal = await prisma.reviewAndRating.count();

  const totalPage = Math.ceil(subTotal / size);

  return {
    meta: {
      total,
      size,
      page,
      totalPage,
    },
    data: result,
  };
};

const getReviewAndRating = async (
  id: string
): Promise<ReviewAndRating | null> => {
  const result = await prisma.reviewAndRating.findUnique({
    where: { id },
    include: {
      user: true,
      service: true,
    },
  });

  return result;
};

const getReviewsByServieId = async (
  serviceId: string
): Promise<ReviewAndRating[] | null> => {
  const result = await prisma.reviewAndRating.findMany({
    where: { serviceId },
    include: {
      user: true,
      service: true,
    },
  });

  return result;
};

const updateReviewAndRating = async (
  id: string,
  payload: Partial<ReviewAndRating>
): Promise<ReviewAndRating | null> => {
  const result = await prisma.reviewAndRating.update({
    where: { id },
    data: payload,
    include: {
      user: true,
      service: true,
    },
  });

  return result;
};

const deleteReviewAndRating = async (
  id: string
): Promise<ReviewAndRating | null> => {
  const result = await prisma.reviewAndRating.delete({
    where: { id },
    include: {
      user: true,
      service: true,
    },
  });

  return result;
};

export const ReviewAndRatingService = {
  insertIntoDB,
  getReviewAndRatings,
  getReviewAndRating,
  updateReviewAndRating,
  deleteReviewAndRating,
  getReviewsByServieId,
};
