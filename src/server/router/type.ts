import Router from "@koa/router";
import { PrismaClient } from "@prisma/client";
import _ from "lodash";

const prisma = new PrismaClient();

const router = new Router({ prefix: "/type" });
router.get("/", async (ctx) => {
  let prismaParams: any = {};
  const queryParams = _.cloneDeep(ctx.query || {});
  if (queryParams.includeBook) {
    prismaParams["include"] = {
      book: true,
    };
    delete queryParams.includeBook;
  }
  const haveParams = Object.keys(queryParams).length > 0;
  let results;
  if (haveParams) {
    queryParams.id && (queryParams.id = Number(queryParams.id)); 
    prismaParams.where = queryParams;
    results = await prisma.type.findFirst(prismaParams);
  } else {
    results = await prisma.type.findMany(prismaParams);
  }
  ctx.body = results;
});

router.post("/", async (ctx) => {
  const results = await prisma.type.create({ data: ctx.request.body });
  ctx.body = results;
});
export default router;
