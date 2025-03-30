import Router from "@koa/router";
import { PrismaClient } from "@prisma/client";
import _ from "lodash";

const prisma = new PrismaClient();



const router = new Router({ prefix: "/type" });
router.get("/", async (ctx) => {
    let prismaParams: any = {};
    const queryParams = _.cloneDeep((ctx.query || {}));
    if (queryParams.includeBook) {
        prismaParams['include'] = {
            book: true
        };
        delete queryParams.includeBook;
    }
    Object.keys(queryParams).length > 0 && (prismaParams.select = queryParams);
    const results = await prisma.type.findMany(prismaParams);
    ctx.body = results;
});



router.post('/', async (ctx) => {
    const results = await prisma.type.create({ data: ctx.request.body });
    ctx.body = results;
})
export default router;