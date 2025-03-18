import Koa from "koa";
import router from "./router/index.ts";


const app = new Koa();

app.use(router());

app.listen(3000, () => {
  console.log("服务已启动：http://localhost:3000");
});
