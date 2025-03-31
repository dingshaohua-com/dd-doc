// import Router from "@koa/router";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();



// const router = new Router({ prefix: "/doc" });
// router.get("/", (ctx) => {
//   ctx.body = "i am doc";
// });

// router.post("/book", async (ctx) => {
//   const results = await prisma.book.create({});
//   ctx.body = results;
// });

// router.get("/books", async (ctx) => {
//   const results = await prisma.book.findMany();
//   ctx.body = results;
// });


// export default router;


import Router from "@koa/router";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const queryOne = async (ctx) => {
    const results = await prisma.book.findFirst({
        where: ctx.query,
    });
    return results;
}

const queryList = async (ctx) => {
    const results = await prisma.book.findMany({
        where: ctx.query,
        omit: { des: true }
    });
    return results;
}

const router = new Router({ prefix: "/book" });
router.get("/", async (ctx) => {
    ctx.query.book_id&&(ctx.query.book_id = Number(ctx.query.book_id) as any);
    const isQueryOne = ctx.query.id;
    if (isQueryOne) {
        ctx.query.id = Number(ctx.query.id) as any;
        ctx.body = await queryOne(ctx);
    } else {
        ctx.body = await queryList(ctx);
    }
});

// router.get("/withType", async (ctx) => {
//   const results = await prisma.book.findMany({
//       include: {
//           type: true // 假设你已经在 Prisma 模型中设置了正确的关系
//       }
//   });

//   ctx.body = results;
// });


router.post('/', async (ctx) => {
    const results = await prisma.book.create({ data: ctx.request.body });
    ctx.body = results;
})
export default router;