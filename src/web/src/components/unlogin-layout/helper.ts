import { MenuProps } from "antd";

export const items: MenuProps["items"] = [
  {
    label: "首页",
    key: "/",
  },
  {
    label: "关于",
    key: "/about",
  },
];


export const getLastPath = (location: any)=>{
  const pathnameStr = location.pathname;
  const pathnameArr = pathnameStr.split('/');
  return pathnameArr[pathnameArr.length-1]
}