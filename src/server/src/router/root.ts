import Router from "@koa/router";
import genToken from "../utils/gen-token";
import { PrismaClient } from '@prisma/client';
import JsonResult from "../utils/json-result";

const prisma = new PrismaClient();
const router = new Router();
router.get("/", async (ctx, next) => {
  ctx.body = "Hello";
});


// 登录
router.post("/login", async (ctx, next) => {
  const user = await prisma.user.findFirst({ where: ctx.request.body });
  console.log(111, user);
  
  if(user){
    ctx.body = JsonResult.success({
      token: genToken(user)
    })
  }else{
    ctx.body = JsonResult.failed("暂未注册，请先注册！");
  }
})
export default router;