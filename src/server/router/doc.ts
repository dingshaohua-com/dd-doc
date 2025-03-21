import Router from "@koa/router";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();



const router = new Router({ prefix: "/doc" });
router.get("/", (ctx) => {
  ctx.body = "i am doc";
});

router.post("/book", async (ctx) => {
  const results = await prisma.book.create({});
  ctx.body = results;
});

router.get("/books", async (ctx) => {
  const results = await prisma.book.findMany();
  ctx.body = results;
});


router.get("/types", async (ctx) => {
    const results = await prisma.doc_type.findMany();
    ctx.body = results;
});
export default router;
