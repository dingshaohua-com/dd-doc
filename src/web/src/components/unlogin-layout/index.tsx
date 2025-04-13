import { Button, Layout } from "antd";
import "./style.scss";
import logoImg from "@/assets/logo.png";
import { useNavigate } from "react-router";

const { Header, Content } = Layout;

const MyLayout: React.FC<any> = (props) => {
  const router = useNavigate();
  const login = () => {
    router('/login')
  }

  return (
    <Layout className="layout">
      <Header className="header">
        <img className="logo" src={logoImg} alt="" />
        <Button type="primary" className="btn" onClick={login}>登录/注册</Button>
      </Header>
      <Content className="content">
        {props.children}
      </Content>
    </Layout>
  );
};

export default MyLayout;