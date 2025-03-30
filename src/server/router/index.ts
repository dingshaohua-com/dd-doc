


import rootRouter from './root.ts'
import userRouter from './user.ts'
import docRouter from './book.ts'
import typeRouter from './type.ts'
import combineRouters from 'koa-combine-routers'
  

const router = combineRouters(
  // @ts-ignore
  rootRouter,
  userRouter,
  docRouter,
  typeRouter
)

export default router;