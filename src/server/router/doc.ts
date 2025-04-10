import Router from '@koa/router';
import { PrismaClient } from '@prisma/client';
import _ from 'lodash';
import toTree from '../utils/to-tree';

const prisma = new PrismaClient();

const queryOne = async (ctx) => {
  const results = await prisma.doc.findFirst({
    where: ctx.query,
  });
  return results;
};

const queryList = async (ctx) => {
  const results = await prisma.doc.findMany({
    where: ctx.query,
    omit: { des: true },
  });
  return toTree(results);
};

const router = new Router({ prefix: '/doc' });
router.get('/', async (ctx) => {
  ctx.query.book_id && (ctx.query.book_id = Number(ctx.query.book_id) as any);
  const isQueryOne = ctx.query.id;
  if (isQueryOne) {
    ctx.query.id = Number(ctx.query.id) as any;
    ctx.body = await queryOne(ctx);
  } else {
    ctx.body = await queryList(ctx);
  }
});

router.post('/', async (ctx) => {
  const bodyParams = ctx.request.body;
  bodyParams['book_id'] = Number(bodyParams['book_id']);
  const results = await prisma.doc.create({ data: bodyParams });
  ctx.body = results;
});

router.put('/', async (ctx) => {
  const bodyParams = _.cloneDeep(ctx.request.body);
  const results = await prisma.doc.update({ where: { id: bodyParams.id }, data: bodyParams });
  ctx.body = results;
});
export default router;
