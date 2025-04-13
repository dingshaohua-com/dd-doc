import { PrismaClient } from '@prisma/client';
import genPrismaParams from "../utils/gen-prisma-params.ts";

const prisma = new PrismaClient();


export const queryOne = (params) => {
    const prismaParams = genPrismaParams(params);
    return prisma.shelf.findFirst(prismaParams);
}

export const queryList = async (params) => {
    const prismaParams = genPrismaParams(params);
    console.log(1111, prismaParams);
    
    return prisma.shelf.findMany(prismaParams);
};

export default {
    queryOne,
    queryList
}

