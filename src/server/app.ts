import Koa from "koa";
import router from "./router/index.ts";
import staticServer from "koa-static";
import { bodyParser } from "@koa/bodyparser";
import chalk from "chalk";
import KoaJwt from "koa-jwt";
import JsonResult from "./utils/json-result";


const app = new Koa();

app.use(bodyParser());
app.use(staticServer("./www"));


const koaJwt = KoaJwt({
  secret: process.env.JWT_SECRET
}).unless({
  path: [/^\/login/, /^\/register/]
})
app.use(koaJwt);
app.use(router());




app.listen(3000, '0.0.0.0', () => {
  console.log(`
    ${chalk.green('➜')}  ${chalk.bold('后端服务:')}   ${chalk.blue('http://localhost:3000')}
    `);
  // console.log("服务已启动：http://localhost:3000");
});
