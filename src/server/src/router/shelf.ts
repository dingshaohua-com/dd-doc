
import Router from '@koa/router';
import _ from 'lodash';
import JsonResult from '../utils/json-result';
import { queryOne, queryList, create } from "../service/shelf.service.ts"


const router = new Router({ prefix: '/shelf' });
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
  const {user} = ctx.state;
  const results = await create({ ...ctx.request.body, user_id: user.id});
  ctx.body = JsonResult.success(results);
});
export default router;
