


import rootRouter from './root.ts'
import userRouter from './user.ts'
import docRouter from './doc.ts'
import combineRouters from 'koa-combine-routers'
  

const router = combineRouters(
  // @ts-ignore
  rootRouter,
  userRouter,
  docRouter
)

export default router;