import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, InputNumber, Select } from 'antd';


const AddBook: React.FC<AddBookProps> = (props) => {

    const [types, setTypes] = useState([]);
    const syncTypes = async () => {
        const res = await api.type.get();
        setTypes(res);
        console.log(1111, res);

    }
    const [form] = Form.useForm();
    const onFinish = async (values: AddBookFieldType) => {
        console.log('Received values of form: ', values);
        const res = await api.book.add(values);
        console.log(res);
        props.setOpen(false);
    };

    useEffect(() => {
        if (props.open) {
            syncTypes();
        }

    }, [props.open])

    return (
        <Modal title="知识库"
            open={props.open}
            okButtonProps={{ autoFocus: true, htmlType: 'submit' }}
            onCancel={() => props.setOpen(false)}
            modalRender={(dom) => (
                <Form
                    form={form}
                    name="addBookType"
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    clearOnDestroy
                    onFinish={(values) => onFinish(values)}
                >
                    {dom}
                </Form>
            )} >
            <Form.Item<AddBookFieldType>
                label="名称"
                name="name"
            >
                <Input />
            </Form.Item>

            <Form.Item<AddBookFieldType>
                label="排序"
                name="sort"
            >
                <InputNumber />
            </Form.Item>

            <Form.Item<AddBookFieldType>
                label="描述"
                name="des"
            >
                <Input.TextArea rows={2} />
            </Form.Item>
            <Form.Item<AddBookFieldType>
                label="封面"
                name="cover"
            >
                <Input />
            </Form.Item>
            <Form.Item<AddBookFieldType>
                label="分类"
                name="type_id"
            >
                <Select>
                    {types.map(item => <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)}
                </Select>
            </Form.Item>
        </Modal>
    );
};

export default AddBook;