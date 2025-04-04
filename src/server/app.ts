import Koa from "koa";
import router from "./router/index.ts";
import staticServer from "koa-static";
import { bodyParser } from "@koa/bodyparser";
import chalk from "chalk";

const app = new Koa();

app.use(bodyParser());
app.use(staticServer("./www"));
app.use(router());

app.listen(3000, '0.0.0.0', () => {
  console.log(`
    ${chalk.green('➜')}  ${chalk.bold('后端服务:')}   ${chalk.blue('http://localhost:3000')}
    `);
  // console.log("服务已启动：http://localhost:3000");
});
