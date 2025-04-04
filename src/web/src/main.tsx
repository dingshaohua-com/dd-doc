import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { ConfigProvider } from "antd";
import zhCN from 'antd/locale/zh_CN';
// import 'dayjs/locale/zh-cn';
import router from "@/router";
import "./index.less";
import '@/api';

createRoot(document.getElementById("root")!).render(
  <ConfigProvider locale={zhCN}>  
    <RouterProvider router={router} />
  </ConfigProvider>
);
