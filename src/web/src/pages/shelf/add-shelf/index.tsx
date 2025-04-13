import React from 'react';
import { Modal, Form, Input, InputNumber } from 'antd';

const AddType: React.FC<AddTypeProps> = (props) => {
  const [form] = Form.useForm();
  const onFinish = async (values: AddTypeFieldType) => {
    console.log('Received values of form: ', values);
    const res = await api.shelf.add(values);
    props.setOpen(false);
  };

  return (
    <Modal
      title="知识库分类"
      open={props.open}
      okButtonProps={{ autoFocus: true, htmlType: 'submit' }}
      onCancel={() => props.setOpen(false)}
      modalRender={(dom) => (
        <Form form={form} name="addBookType" wrapperCol={{ span: 16 }} initialValues={{ remember: true }} clearOnDestroy onFinish={(values) => onFinish(values)}>
          {dom}
        </Form>
      )}
    >
      <Form.Item<AddTypeFieldType> label="名称" name="name">
        <Input />
      </Form.Item>

      <Form.Item<AddTypeFieldType> label="排序" name="sort">
        <InputNumber />
      </Form.Item>

      <Form.Item<AddTypeFieldType> label="描述" name="des">
        <Input.TextArea rows={4} />
      </Form.Item>
    </Modal>
  );
};

export default AddType;
