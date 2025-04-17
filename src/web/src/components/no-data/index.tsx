import './style.scss';
import { Button } from 'antd';
import noBookImg from "@/assets/no-book.webp";
import { useNavigate } from 'react-router';

const NoData = (props) => {
    const navigate = useNavigate();
    const goBack = () => {
        if(props.path){
            navigate(props.path);
        }else{
            window.history.back();
        }
      
    }
    return (
        <div className="no-data">
            <div className='content'>
                <img src={noBookImg} alt="" />
                <div className="text">
                    <h3>暂无数据，别乱访问哦！</h3>
                    <Button type='primary' onClick={goBack}>返回上一页</Button>
                </div>
            </div>

        </div>
    )
}

export default NoData;