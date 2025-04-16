import { PrismaClient } from '@prisma/client';
import {reoParams} from "../utils/gen-prisma-params.ts";

const prisma = new PrismaClient();
export const queryOne = (params) => {
    const {other, include} = reoParams(params);
    return prisma.shelf.findFirst({
        where: {
            ...other, 
        },
        include
    });
}

export const queryList = async (params) => {
    const {other, include} = reoParams(params);
    return prisma.shelf.findMany({
        where: {
            ...other, 
            user_id: params.user_id
        },
        include
    });
};

export const create = (params) => {
    return prisma.shelf.create({ data: params });
}


export default {
    queryOne,
    queryList,
    create
}

