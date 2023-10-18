/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, Service } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import {
  serviceRelationalFields,
  serviceRelationalFieldsMapper,
  serviceSearchableFields,
} from './service.constants';
import { IServiceFilterRequest } from './service.interface';

const insertIntoDB = async (data: Service): Promise<Service> => {
  const result = await prisma.service.create({
    data,
  });
  return result;
};

const getServices = async (
  filters: IServiceFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Service[]>> => {
  const { size, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, minPrice, maxPrice, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: serviceSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (minPrice !== undefined) {
    andConditions.push({
      price: {
        gte: Number(minPrice),
      },
    });
  }

  if (maxPrice !== undefined) {
    andConditions.push({
      price: {
        lte: Number(maxPrice),
      },
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (serviceRelationalFields.includes(key)) {
          return {
            [serviceRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.ServiceWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.service.findMany({
    where: whereConditions,
    skip,
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.service.count({
    where: whereConditions,
  });

  const subtotal = await prisma.service.count();

  const totalPage = Math.ceil(subtotal / size);

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

const getServiceById = async (id: string): Promise<Service | null> => {
  const result = await prisma.service.findUnique({ where: { id } });
  return result;
};

const updateServiceById = async (
  id: string,
  payload: Partial<Service>
): Promise<Service | null> => {
  const result = await prisma.service.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteServiceById = async (id: string): Promise<Service | null> => {
  const result = await prisma.service.delete({
    where: {
      id,
    },
  });
  return result;
};

export const Services = {
  insertIntoDB,
  getServices,
  getServiceById,
  updateServiceById,
  deleteServiceById,
};
