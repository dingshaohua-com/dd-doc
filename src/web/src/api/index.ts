// init.ts
import axios from 'axios';
import { message } from "antd"
import store from "@/store";

const getFileNameFromUrl = (url) => {
  const match = url.match(/([^/]+)\.([^/]+)?$/); // 使用正则表达式匹配文件名（不包括扩展名）
  if (match && match[1]) {
    let fileName = match[1];
    // 转换为小写，并用正则表达式替换每个分隔符后的字符为大写（除非它是字符串的第一个字符）
    fileName = fileName
      .toLowerCase() // 先转换为小写
      .replace(/[-_\s]+(.)?/g, (match, p1) => (p1 ? p1.toUpperCase() : ''))
      .replace(/^./, (str) => str.toLowerCase()); // 转换为小驼峰
    return fileName;
  }
  return null; // 如果没有匹配到文件名，则返回null
};

// ---===全局默认axios配置===---
// const whitePath = ["/login", "/sms-send"]; // 白名单
axios.defaults.baseURL = '/api';
axios.defaults.timeout = 10000;
axios.interceptors.request.use(
  (config) => {
    const { token } = store.getState();
    if(token){
      config.headers.Authorization = "Bearer "+token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => {
    const res = response.data;

    if (res.code === 1) {
      message.error(res.msg)
      return Promise.reject(res.msg);
    } else {
      return res.data;
    }
  },
  (error) => {
    if(error.status===401){
      message.error('登录失效，即将跳转至登录')
      setTimeout(()=>{
        location.href = "/login"
      },2000)
    }
   
    return Promise.reject(error);
  },
);

// ---===将api注入全局，只需将api定义放在modules中即可===---
// 参数1：其目录路径相对于此配置文件的位置；参数2：是否搜索其子目录；参数3：匹配基础组件文件名的正则表达式
const requireModules: any = import.meta.glob('./modules/**.ts', { eager: true });
const api = {};
Object.keys(requireModules).forEach(async (filePath) => {
  const fileName = getFileNameFromUrl(filePath);
  api[fileName] = requireModules[filePath];
});
window.api = api;
