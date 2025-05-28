import React, { useState } from 'react';
import { WrapperHeader, WrapperUploadFile } from './style';
import { Button, Form, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TableComponent from '../TableComponent/TableComponent';
import InputComponent from '../InputComponent/InputComponent';
import InputFormComponent from '../InputFormComponent/InputFormComponent';
import { getBase64 } from '../../utils';

const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stateProduct, setStateProduct] = useState({
    name: '',
    type: '',
    countInStock: '',
    price: '',
    rating: '',
    description: '',
    image: '',
  });

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = () => {
    console.log('finish', stateProduct);
  };

  const handleOnChange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnChangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProduct({
      ...stateProduct,
      image: file.preview,
    });
  };

  return (
    <div>
      <WrapperHeader>Quản Lý Sản Phẩm</WrapperHeader>
      <div style={{ marginTop: '10px' }}>
        <Button
          style={{ height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed' }}
          onClick={() => setIsModalOpen(true)}
        >
          <PlusOutlined style={{ fontSize: '60px' }} />
        </Button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <TableComponent />
      </div>
      <Modal title="Tạo sản phẩm" open={isModalOpen} onCancel={handleCancel} okText="">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your Name!' }]}>
            <InputComponent value={stateProduct.name} onChange={handleOnChange} name="name" />
          </Form.Item>

          <Form.Item label="Type" name="type" rules={[{ required: true, message: 'Please input your Type!' }]}>
            <InputComponent value={stateProduct.type} onChange={handleOnChange} name="type" />
          </Form.Item>

          <Form.Item
            label="Count in Stock"
            name="countInStock"
            rules={[{ required: true, message: 'Please input your Count in Stock!' }]}
          >
            <InputComponent value={stateProduct.countInStock} onChange={handleOnChange} name="countInStock" />
          </Form.Item>

          <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please input your Price!' }]}>
            <InputComponent value={stateProduct.price} onChange={handleOnChange} name="price" />
          </Form.Item>

          <Form.Item label="Rating" name="rating" rules={[{ required: true, message: 'Please input your Rating!' }]}>
            <InputComponent value={stateProduct.rating} onChange={handleOnChange} name="rating" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input your Description!' }]}
          >
            <InputComponent value={stateProduct.description} onChange={handleOnChange} name="description" />
          </Form.Item>

          <Form.Item label="Avatar" name="avatar" rules={[{ required: true, message: 'Please input your Avatar!' }]}>
            <WrapperUploadFile onChange={handleOnChangeAvatar} maxCount={1}>
              <Button>Select File</Button>
              {stateProduct?.image && (
                <img
                  src={stateProduct?.image}
                  style={{ height: '60px', width: '60px', borderRadius: '50%', objectFit: 'cover', marginLeft: '10px' }}
                  alt="Image Preview"
                />
              )}
            </WrapperUploadFile>
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminProduct;
