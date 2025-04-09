import rootRouter from './root.ts'
import userRouter from './user.ts'
import shelfRouter from './shelf.ts'
import bookRouter from './book.ts'
import docRouter from './doc.ts'
import combineRouters from 'koa-combine-routers'
  

const router = combineRouters(
  // @ts-ignore
  rootRouter,
  userRouter,
  shelfRouter,
  bookRouter,
  docRouter
)

export default router;