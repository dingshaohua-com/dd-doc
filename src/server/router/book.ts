import _ from 'lodash';
import Router from '@koa/router';
import { PrismaClient } from '@prisma/client';
import toTree from '../utils/to-tree';
import JsonResult from '../utils/json-result';

const prisma = new PrismaClient();

const queryOne = async (ctx) => {
  const queryParams = _.cloneDeep(ctx.query);
  const prismaParams = { where: queryParams };
  if (queryParams.includeDoc) {
    prismaParams['include'] = {
      // doc: true // 返回所有字段
      doc: {
        select: {
          // 你只列出你想要的字段，不写 dtl 就不会返回它
          id: true,
          name: true,
          book_id: true,
          sort: true,
          create_time: true,
          pid: true,
        },
      },
    };
    delete prismaParams.where.includeDoc;
  }
  const results: any = await prisma.book.findFirst(prismaParams);
  results.docs = toTree(results.doc);
  delete results.doc;
  return results;
};

const queryList = async (ctx) => {
  const queryParams = _.cloneDeep(ctx.query);
  delete queryParams.includeDoc;
  const results = await prisma.book.findMany({
    where: queryParams,
    omit: { des: true },
  });
  return results;
};

const router = new Router({ prefix: '/book' });
router.get('/', async (ctx) => {
  ctx.query.book_id && (ctx.query.book_id = Number(ctx.query.book_id) as any);
  const isQueryOne = ctx.query.id;
  if (isQueryOne) {
    ctx.query.id = Number(ctx.query.id) as any;
    ctx.body = JsonResult.success(await queryOne(ctx));
  } else {
    ctx.body = JsonResult.success(await queryList(ctx));
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
  ctx.body = JsonResult.success(results);
});
export default router;
