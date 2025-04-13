import { setToken } from "@/store/action-creator";
import "./style.scss";
import logoImg from "@/assets/logo.png";
import { Button, Input, Form } from 'antd'
import type { FormProps } from 'antd';
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router";


type FieldType = {
    email?: string;
    password?: string;
};

const Login: React.FC = () => {
   
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const {token} = await api.root.login(values);
        dispatch(setToken(token));
        navigate('/shelf')
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (<div className="login">
        <div className="content">
            <img className="logo" src={logoImg} alt="" />
            <div className="form">
                <Form
                    name="basic"
                    labelCol={{ span: 0 }}
                    wrapperCol={{ span: 24 }}
                    initialValues={{ email: "960423114@qq.com", password: 'dshvv' }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="邮箱"
                        name="email"
                        rules={[{ required: true, message: '请输入邮箱' }]}
                    >
                        <Input placeholder="请输入邮箱" />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: '请输入密码' }]}
                    >
                        <Input.Password placeholder="请输入密码" />
                    </Form.Item>

                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit" className="sbmt">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    </div>);
};

export default Login;
