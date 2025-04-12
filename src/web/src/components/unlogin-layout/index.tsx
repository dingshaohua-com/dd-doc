import React, { useEffect, useState } from "react";
import { items } from "./helper";
import { Button, Layout, Menu } from "antd";
import style from "./style.module.scss";
import logoImg from "@/assets/logo.png";
import { useLocation, useNavigate } from "react-router";

const { Header, Content } = Layout;

const MyLayout: React.FC = (props:any) => {
  const [selectedKeys, setSelectedKeys] = useState([]);
  const location = useLocation();
  useEffect(() => {
    setSelectedKeys([location.pathname]);
  }, [location]);
  const router = useNavigate();
  const onClick = (item: any) => {
    router(item.key);
  };

  const login = () => {
    router('/login')
  }

  return (
    <Layout className={style.layout}>
      <Header className={style.header}>
        <img className={style.logo} src={logoImg} alt="" />
        <Menu
          mode="horizontal"
          selectedKeys={selectedKeys}
          items={items}
          onClick={onClick}
        />
        <Button type="primary" className={style.btn} onClick={login}>登录/注册</Button>
      </Header>
      <Content className={style.content}>
        {props.children}
      </Content>
    </Layout>
  );
};

export default MyLayout;



// import React, { useEffect, useState } from "react";
// import { items } from "./helper";
// import { Button, Layout, Menu } from "antd";
// import style from "./style.module.less";
// import logoImg from "@/assets/logo.png";
// import { Outlet, useLocation, useNavigate } from "react-router-dom";

// const { Header, Content } = Layout;

// const MyLayout: React.FC = () => {
//   const [selectedKeys, setSelectedKeys] = useState([]);
//   const location = useLocation();

//   useEffect(() => {
//     setSelectedKeys([location.pathname]);
//   }, [location]);
//   const router = useNavigate();
//   const onClick = (item: any) => {
//     router(item.key);
//   };

//   const login = ()=>{
//     router('/login')
//   }

//   return (
//       <Header className={style.header}>
//         <img className={style.logo} src={logoImg} alt="" />
//         <Menu
//           mode="horizontal"
//           selectedKeys={selectedKeys}
//           items={items}
//           onClick={onClick}
//         />
//         <Button type="primary" className={style.btn} onClick={login}>登录/注册</Button>
//       </Header>
//   );
// };

// export default MyLayout;
