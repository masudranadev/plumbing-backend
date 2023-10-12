import { Category, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import { categorySearchableFields } from './category.constants';
import { ICategoryFilterRequest } from './category.interface';

const insertIntoDB = async (data: Category): Promise<Category> => {
  const result = await prisma.category.create({
    data,
  });
  return result;
};

const getCategories = async (
  filters: ICategoryFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Category[]>> => {
  const { page, size, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const { search, ...filterData } = filters;
  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: categorySearchableFields.map(field => ({
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

  const whereCondition: Prisma.CategoryWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.category.findMany({
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

  const total = await prisma.category.count({ where: whereCondition });

  const subTotal = await prisma.category.count();

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

const getCategory = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({
    where: { id },
    include: {
      books: true,
    },
  });

  return result;
};

const updateCategory = async (
  id: string,
  payload: Partial<Category>
): Promise<Category | null> => {
  const result = await prisma.category.update({
    where: { id },
    data: payload,
  });

  return result;
};

const deleteCategory = async (id: string): Promise<Category | null> => {
  await prisma.book.deleteMany({
    where: {
      categoryId: id,
    },
  });
  const result = await prisma.category.delete({
    where: { id },
  });

  return result;
};

export const CategoryService = {
  insertIntoDB,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
