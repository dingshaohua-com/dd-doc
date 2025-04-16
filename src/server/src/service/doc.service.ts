import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const queryOne = async (params, user) => {
  const results: any = await prisma.doc.findFirst({
    where: params,
  });
  return results;
};

export const queryList = async (params, user) => {
  const results = await prisma.doc.findMany({
    where: params,
    omit: { des: true },
  });
  return results;
};

export const create = async (params) => {
  const results = await prisma.doc.create(params);
  return results;
};
