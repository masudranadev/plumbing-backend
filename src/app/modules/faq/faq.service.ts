import { FAQ } from '@prisma/client';
import { prisma } from '../../../shared/prisma';

const insertIntoDB = async (data: FAQ): Promise<FAQ> => {
  const result = await prisma.fAQ.create({ data });
  return result;
};

const getFaqs = async (): Promise<FAQ[]> => {
  const result = await prisma.fAQ.findMany({});
  return result;
};

const getFaq = async (id: string): Promise<FAQ | null> => {
  const result = await prisma.fAQ.findUnique({ where: { id } });
  return result;
};

const updateFaq = async (
  id: string,
  payload: Partial<FAQ>
): Promise<FAQ | null> => {
  const result = await prisma.fAQ.update({ where: { id }, data: payload });
  return result;
};

const deleteFaq = async (id: string): Promise<FAQ | null> => {
  const result = await prisma.fAQ.delete({ where: { id } });
  return result;
};

export const FaqService = {
  getFaq,
  getFaqs,
  deleteFaq,
  updateFaq,
  insertIntoDB,
};
