import Koa from "koa";
import router from "./router/index.ts";
import staticServer from "koa-static";
import { bodyParser } from "@koa/bodyparser";
import chalk from "chalk";
import KoaJwt from "koa-jwt";
import userMount from "./middleware/user-mount.ts"


const app = new Koa();
app.use(bodyParser());
app.use(staticServer("./www"));

// 1. 使用 koa-jwt 中间件（验证 JWT）
const koaJwt = KoaJwt({
  secret: process.env.JWT_SECRET
}).unless({
  path: [/^\/login/, /^\/register/]
})
app.use(koaJwt);

// 2. 自定义中间件：解析 token 并挂载 payload 到 ctx
app.use(userMount);

// 3. 路由
app.use(router());

app.listen(3000, '0.0.0.0', () => {
  console.log(`
    ${chalk.green('➜')}  ${chalk.bold('后端服务:')}   ${chalk.blue('http://localhost:3000')}
    `);
  // console.log("服务已启动：http://localhost:3000");
});
