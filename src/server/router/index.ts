import rootRouter from './root.ts'
import userRouter from './user.ts'
import typeRouter from './type.ts'
import bookRouter from './book.ts'
import docRouter from './doc.ts'
import combineRouters from 'koa-combine-routers'
  

const router = combineRouters(
  // @ts-ignore
  rootRouter,
  userRouter,
  typeRouter,
  bookRouter,
  docRouter
)

export default router;