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
import DrawerComponent from '../DrawerComponent/DrawerComponent';

const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState('');
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [stateProduct, setStateProduct] = useState({
    name: '',
    type: '',
    countInStock: '',
    price: '',
    rating: '',
    description: '',
    image: '',
  });
  const [stateProductDetails, setStateProductDetails] = useState({
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

  const fetchDetailsProduct = async (id) => {
    const response = await ProductService.getDetailsProduct(id);
    if (response?.data) {
      setStateProductDetails({
        name: response?.data?.name,
        type: response?.data?.type,
        countInStock: response?.data?.countInStock,
        price: response?.data?.price,
        rating: response?.data?.rating,
        description: response?.data?.description,
        image: response?.data?.image,
      });
    }
    return response;
  };

  console.log(stateProductDetails);

  const handleDetailProduct = () => {
    if (rowSelected?._id) {
      fetchDetailsProduct();
    }
    setIsOpenDrawer(true);
    console.log('rowSelected', rowSelected);
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
        <EditOutlined
          style={{ color: 'orange', fontSize: '24px', marginRight: '12px', cursor: 'pointer' }}
          onClick={handleDetailProduct}
        />
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

  const handleOnChangeDetails = (e) => {
    setStateProductDetails({
      ...stateProductDetails,
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

  const handleOnChangeImageDetails = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProductDetails({
      ...stateProductDetails,
      image: file.preview,
    });
  };

  useEffect(() => {
    form.setFieldsValue(stateProductDetails);
  }, [stateProductDetails]);

  useEffect(() => {
    if (rowSelected?._id) {
      fetchDetailsProduct(rowSelected?._id);
      setIsOpenDrawer(true);
    }
  }, [rowSelected]);

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
        <TableComponent
          columns={columns}
          data={dataTable}
          isLoading={isLoading}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setRowSelected(record);
              },
            };
          }}
        />
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
      <DrawerComponent
        title="Chi tiết sản phẩm"
        isOpen={isOpenDrawer}
        width="90%"
        onClose={() => setIsOpenDrawer(false)}
      >
        <Loading isPending={isPending}>
          <Form
            name="basic"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 22 }}
            onFinish={onFinish}
            autoComplete="on"
            form={form}
          >
            <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your Name!' }]}>
              <InputComponent value={stateProductDetails.name} onChange={handleOnChangeDetails} name="name" />
            </Form.Item>

            <Form.Item label="Type" name="type" rules={[{ required: true, message: 'Please input your Type!' }]}>
              <InputComponent value={stateProductDetails.type} onChange={handleOnChangeDetails} name="type" />
            </Form.Item>

            <Form.Item
              label="Count in Stock"
              name="countInStock"
              rules={[{ required: true, message: 'Please input your Count in Stock!' }]}
            >
              <InputComponent
                value={stateProductDetails.countInStock}
                onChange={handleOnChangeDetails}
                name="countInStock"
              />
            </Form.Item>

            <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please input your Price!' }]}>
              <InputComponent value={stateProductDetails.price} onChange={handleOnChangeDetails} name="price" />
            </Form.Item>

            <Form.Item label="Rating" name="rating" rules={[{ required: true, message: 'Please input your Rating!' }]}>
              <InputComponent value={stateProductDetails.rating} onChange={handleOnChangeDetails} name="rating" />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: 'Please input your Description!' }]}
            >
              <InputComponent
                value={stateProductDetails.description}
                onChange={handleOnChangeDetails}
                name="description"
              />
            </Form.Item>

            <Form.Item label="Image" name="image" rules={[{ required: true, message: 'Please input your Image!' }]}>
              <WrapperUploadFile onChange={handleOnChangeImageDetails} maxCount={1}>
                <Button>Select File</Button>
                {stateProductDetails?.image && (
                  <img
                    src={stateProductDetails?.image}
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
      </DrawerComponent>
    </div>
  );
};

export default AdminProduct;
