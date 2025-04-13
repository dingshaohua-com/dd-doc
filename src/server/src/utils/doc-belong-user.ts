import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const docBelongUser = async (docId: number, userId: number) => {
    const doc = await prisma.doc.findFirst({
        where: {
            id: docId,
            book: {
                shelf: {
                    user_id: userId
                },
            },
        },
        select: { id: true },
    })
    if (!doc) {
        const err: any = new Error('权限不足或资源不存在')
        err.status = 403
        throw err
    }
}
export default docBelongUser;