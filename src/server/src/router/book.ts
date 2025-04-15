import _ from 'lodash';
import Router from '@koa/router';
import JsonResult from '../utils/json-result';
import { queryOne, queryList, create } from "../service/shelf-service.ts"

const router = new Router({ prefix: '/book' });
router.get('/', async (ctx) => {
  const query = ctx.query as any;
  if (ctx.state.user) {
    query.user_id = ctx.state.user.id;
  }
  const haveId = query.id && (query.id = Number(query.id));
  const res = haveId ? await queryOne(query) : await queryList(query);
  ctx.body = JsonResult.success(res);
});

router.post('/', async (ctx) => {
  const results = await create({ data: ctx.request.body });
  ctx.body = JsonResult.success(results);
});
export default router;
