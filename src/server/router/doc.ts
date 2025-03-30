import Router from "@koa/router";
import { PrismaClient } from "@prisma/client";
import _ from "lodash";

const prisma = new PrismaClient();



const router = new Router({ prefix: "/doc" });
router.get("/", async (ctx) => {
    console.log(11111, ctx.query);
    let prismaParams: any = {};
    const queryParams = _.cloneDeep((ctx.query || {}));
    if (queryParams.includeBook) {
        prismaParams['include'] = {
            book: true
        };
        delete queryParams.includeBook;
    }
    Object.keys(queryParams).length > 0 && (prismaParams.select = queryParams);
    console.log(22222, prismaParams);
    
    const results = await prisma.doc.findMany(prismaParams);
    ctx.body = results;
});



router.post('/', async (ctx) => {
    const results = await prisma.doc.create({ data: ctx.request.body });
    ctx.body = results;
})
export default router;