import React, { useEffect, useState } from 'react';
import { WrapperHeader, WrapperUploadFile } from './style';
import { Button, Form, Modal } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import TableComponent from '../TableComponent/TableComponent';
import InputComponent from '../InputComponent/InputComponent';
import { getBase64 } from '../../utils';
import * as ProductService from '../../services/ProductService';
import * as message from '../../components/MessageComponent/Message';
// import { useDispatch, useSelector } from 'react-redux';
import { useMutationHook } from '../../hooks/useMutationHook';
import Loading from '../LoadingComponent/Loading';
import { useQuery } from '@tanstack/react-query';

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

  const [form] = Form.useForm();

  const mutation = useMutationHook((data) => {
    const { name, type, countInStock, price, rating, description, image } = data;
    return ProductService.createProduct({ name, type, countInStock, price, rating, description, image });
  });

  const fetchProductAll = async () => {
    const response = await ProductService.getAllProduct();
    return response;
  };

  const { data, isPending, isSuccess, isError } = mutation;

  const { isLoading, data: products } = useQuery({
    queryKey: ['product'],
    queryFn: fetchProductAll,
    retry: 1,
    retryDelay: 1000,
  });

  const renderAction = () => {
    return (
      <div>
        <EditOutlined style={{ color: 'orange', fontSize: '24px', marginRight: '12px', cursor: 'pointer' }} />
        <DeleteOutlined style={{ color: 'red', fontSize: '24px', cursor: 'pointer' }} />
      </div>
    );
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: renderAction,
    },
  ];

  const dataTable =
    products?.data?.length > 0 &&
    products?.data?.map((product) => {
      return { ...product, key: product._id };
    });

  const handleCancel = () => {
    setIsModalOpen(false);
    setStateProduct({
      name: '',
      type: '',
      countInStock: '',
      price: '',
      rating: '',
      description: '',
      image: '',
    });
    form.resetFields();
  };
  const onFinish = () => {
    mutation.mutate(stateProduct);
    console.log('finish', stateProduct);
  };

  const handleOnChange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnChangeImage = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProduct({
      ...stateProduct,
      image: file.preview,
    });
  };

  useEffect(() => {
    if (isSuccess && data.status === 'OK') {
      message.success('Tạo sản phẩm thành công');
      handleCancel();
    } else if (isError) {
      message.error('Tạo sản phẩm thất bại');
    }
  }, [isSuccess, isError]);

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
        <TableComponent columns={columns} data={dataTable} isLoading={isLoading} />
      </div>
      <Modal title="Tạo sản phẩm" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Loading isPending={isPending}>
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
            autoComplete="on"
            form={form}
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

            <Form.Item label="Image" name="image" rules={[{ required: true, message: 'Please input your Image!' }]}>
              <WrapperUploadFile onChange={handleOnChangeImage} maxCount={1}>
                <Button>Select File</Button>
                {stateProduct?.image && (
                  <img
                    src={stateProduct?.image}
                    style={{
                      height: '60px',
                      width: '60px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      marginLeft: '10px',
                    }}
                    alt="Image Preview"
                  />
                )}
              </WrapperUploadFile>
            </Form.Item>

            <Form.Item label={null} wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </Modal>
    </div>
  );
};

export default AdminProduct;
