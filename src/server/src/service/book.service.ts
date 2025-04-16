import { PrismaClient } from '@prisma/client';
import { reoParams } from '../utils/gen-prisma-params';

const prisma = new PrismaClient();
export const queryOne = async (params, user) => {
  const {other, include} = reoParams(params);
  const results:any = await prisma.book.findFirst({
    where: other,
    omit: { des: true },
    include
  });
  results.docs = results.doc;
  delete results.doc;
  
  return results;
};

export const queryList = async (params, user) => {
  const {other, include} = reoParams(params);
  const results = await prisma.book.findMany({
    where: other,
    omit: { des: true },
    include
  });
  return results;
};

export const create = async (params) => {
  const results = await prisma.book.create(params);
  return results;
};
