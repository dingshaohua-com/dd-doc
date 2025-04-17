import _ from 'lodash';
import Router from '@koa/router';
import JsonResult from '../utils/json-result';
import { queryOne, queryList, create } from "../service/book.service.ts"

const router = new Router({ prefix: '/book' });
router.get('/', async (ctx) => {
  const query = ctx.query as any;
  const haveId = query.id && (query.id = Number(query.id));
  const res = haveId ? await queryOne(query, ctx.state.user) : await queryList(query, ctx.state.user);
  ctx.body = res?JsonResult.success(res):JsonResult.failed("未找到数据");
});

router.post('/', async (ctx) => {
  const results = await create({ data: ctx.request.body });
  ctx.body = JsonResult.success(results);
});
export default router;
