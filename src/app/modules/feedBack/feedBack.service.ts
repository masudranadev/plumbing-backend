import { FeedBack } from '@prisma/client';
import { prisma } from '../../../shared/prisma';

const insertIntoDB = async (data: FeedBack): Promise<FeedBack> => {
  console.log(data);

  const result = await prisma.feedBack.create({
    data,
    include: {
      user: true,
      service: true,
    },
  });
  return result;
};

const getFeedBacks = async (): Promise<FeedBack[]> => {
  const result = await prisma.feedBack.findMany({
    include: { user: true, service: true },
  });
  return result;
};
const getFeedBack = async (id: string): Promise<FeedBack | null> => {
  const result = await prisma.feedBack.findUnique({
    where: { id },
    include: { user: true, service: true },
  });
  return result;
};
const deleteFeedback = async (id: string): Promise<FeedBack | null> => {
  const result = await prisma.feedBack.delete({
    where: { id },
    include: { user: true, service: true },
  });
  return result;
};

export const FeedBackService = {
  insertIntoDB,
  getFeedBacks,
  getFeedBack,
  deleteFeedback
};
