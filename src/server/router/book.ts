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



const router = new Router({ prefix: "/book" });
router.get("/", async (ctx) => {
    let results;
    if (Object.keys(ctx.query).length > 0) {
        results = await prisma.book.findFirst({ select: ctx.query });
    } else {
        results = await prisma.book.findMany();
    }

    ctx.body = results;
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