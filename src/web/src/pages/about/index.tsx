import UnloginLayout from "@/components/unlogin-layout";
import style from "./style.module.scss";
import weImg from "@/assets/we.png";

const About: React.FC = () => {
  return (
    <UnloginLayout>
      <div className={style.careers}>
        <h2 className={style.sub_title}>
          我们正在<mark className={style.hightlight}>塑造</mark>
        </h2>

        <div className={style.title_wrapp}>
          <h1 className={style.title}>新一代知识构建与分享工具</h1>
        </div>

        <div className={style.intro}>
          <p>
            语鸟诞生伊始，只是希望能给工程师提供一个好用的工具用来写技术文档，但在产品研发的过程中，我们发现其实身边的每个人、每个团队都有很多知识，但一直以来缺少一个好用的工具，让这些知识不只是留在每个人的大脑或电脑里，还可以被方便地记录、分享和交流。
          </p>
          <p>带着这颗初心，我们觉得语鸟不应止步于服务工程师，应该致力于为每个人和团队提供一款顺手的工具，让知识能得以记录、沉淀和交流，让人们可以在「语鸟」中平等快乐地创作和交流知识。</p>
          <p>我们希望每一个人和团队，可以将自己的学习、记录、思考和创作，有机的整合在一起，形成有生命力的独特景观，<b>让再小的个体也可以拥有自己的数字花园</b>。</p>


        </div>
        <img src={weImg} className={style.we_img} />
      </div>
    </UnloginLayout >
  );
};

export default About;
