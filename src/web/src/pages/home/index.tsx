import "./style.scss";
import banner1Img from "@/assets/banner1.png";
import banner2Img from "@/assets/banner2.png";
import withImg from '@/assets/with.png'
import UnloginLayout from '@/components/unlogin-layout'

const Home: React.FC = () => {
  return (
    <UnloginLayout>
      <div className="home">
        <h1 className="tip">
          <mark className="hightlight">语鸟</mark>
          ，为每一个人提供优秀的文档和知识库工具
        </h1>
        <div>
          <img src={banner1Img} width="100%" />
        </div>

        <div className="title">
          <h2>特色能力</h2>
          <div>用专业好用的编辑器与知识库，像书一样构建你的个人笔记和知识管理体系，释放每一个人的创造性</div>
        </div>

        <img src={withImg} className="with" />
        <img src={banner2Img} width="100%" />
      </div>
    </UnloginLayout>

  );
};

export default Home;