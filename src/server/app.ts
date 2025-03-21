import Koa from "koa";
import router from "./router/index.ts";
import staticServer from "koa-static";

const app = new Koa();

app.use(staticServer("./www"));
app.use(router());

app.listen(3000, '0.0.0.0', () => {
  console.log("服务已启动：http://localhost:3000");
});
