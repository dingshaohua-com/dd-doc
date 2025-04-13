import { PrismaClient } from '@prisma/client';
import {genPrismaFindParams} from "../utils/gen-prisma-params.ts";

const prisma = new PrismaClient();


export const queryOne = (params) => {
    const prismaParams = genPrismaFindParams(params);
    return prisma.shelf.findFirst(prismaParams);
}

export const queryList = async (params) => {
    const prismaParams = genPrismaFindParams(params);
  
    return prisma.shelf.findMany(prismaParams);
};

export const create = (params) => {
    return prisma.shelf.create({ data: params });
}


export default {
    queryOne,
    queryList,
    create
}

