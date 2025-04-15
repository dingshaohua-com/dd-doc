import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const queryOne = async (params) => {
  const results: any = await prisma.book.findFirst({
    where: params,
  });
  return results;
};

export const queryList = async (params) => {
  const results = await prisma.book.findMany({
    where: params,
    omit: { des: true },
  });
  return results;
};

export const create = async (params) => {
  const results = await prisma.book.create(params);
  return results;
};
