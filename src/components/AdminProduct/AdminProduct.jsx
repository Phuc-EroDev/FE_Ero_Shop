import React, { useEffect, useRef, useState } from 'react';
import { WrapperHeader, WrapperUploadFile } from './style';
import { Button, Form, Select, Space } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import TableComponent from '../TableComponent/TableComponent';
import InputComponent from '../InputComponent/InputComponent';
import InputTextAreaComponent from '../InputTextAreaComponent/InputTextAreaComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import { getBase64, renderOptions } from '../../utils';
import * as ProductService from '../../services/ProductService';
import { useMessage } from '../../context/MessageContext.jsx';
import { useMutationHook } from '../../hooks/useMutationHook';
import Loading from '../LoadingComponent/Loading';
import { useQuery } from '@tanstack/react-query';
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import { useSelector } from 'react-redux';
import ModalComponent from '../ModalComponent/ModalComponent';

const AdminProduct = () => {
  const initial = () => ({
    name: '',
    type: '',
    newType: '',
    countInStock: '',
    price: '',
    rating: '',
    discount: '',
    description: '',
    image: [],
  });

  const { success, error, warning } = useMessage();
  const searchInput = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [isModalOpenDeleteMany, setIsModalOpenDeleteMany] = useState(false);
  const [idsDelete, setIdsDelete] = useState([]);
  const [rowSelected, setRowSelected] = useState('');
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [stateProduct, setStateProduct] = useState(initial());
  const [stateProductDetails, setStateProductDetails] = useState(initial());

  const user = useSelector((state) => state?.user);

  const [form] = Form.useForm();

  const mutation = useMutationHook((data) => {
    const { name, type, countInStock, price, rating, discount, description, image } = data;
    return ProductService.createProduct({ name, type, countInStock, price, rating, discount, description, image });
  });

  const mutationUpdate = useMutationHook((data) => {
    const { _id, access_token, ...rests } = data;
    const newData = rests.stateProductDetails;
    return ProductService.updateProduct(_id, newData, access_token);
  });

  const mutationDelete = useMutationHook((data) => {
    const { _id, access_token } = data;
    return ProductService.deleteProduct(_id, access_token);
  });

  const mutationDeleteMany = useMutationHook((data) => {
    const { ids, access_token } = data;
    return ProductService.deleteManyProduct(ids, access_token);
  });

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    return res?.data;
  };

  const fetchProductAll = async () => {
    const response = await ProductService.getAllProduct('', 0, 1000);
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
        discount: response?.data?.discount,
        description: response?.data?.description,
        image: response?.data?.image,
      });
    }
    return response;
  };

  const handleDetailProduct = () => {
    setIsOpenDrawer(true);
  };

  const { data, isPending, isSuccess, isError } = mutation;
  const {
    data: dataUpdated,
    isPending: isPendingUpdated,
    isSuccess: isSuccessUpdated,
    isError: isErrorUpdated,
  } = mutationUpdate;
  const {
    data: dataDeleted,
    isPending: isPendingDeleted,
    isSuccess: isSuccessDeleted,
    isError: isErrorDeleted,
  } = mutationDelete;
  const {
    data: dataDeletedMany,
    isPending: isPendingDeletedMany,
    isSuccess: isSuccessDeletedMany,
    isError: isErrorDeletedMany,
  } = mutationDeleteMany;

  const typeProducts = useQuery({
    queryKey: ['type-product'],
    queryFn: fetchAllTypeProduct,
  });

  const queryProduct = useQuery({
    queryKey: ['product'],
    queryFn: fetchProductAll,
  });
  const { isLoading, data: products } = queryProduct;

  const renderAction = (record) => {
    return (
      <div>
        <EditOutlined
          style={{ color: 'orange', fontSize: '24px', marginRight: '12px', cursor: 'pointer' }}
          onClick={(e) => {
            e.stopPropagation();
            setRowSelected(record);
            handleDetailProduct();
          }}
        />
        <DeleteOutlined
          style={{ color: 'red', fontSize: '24px', cursor: 'pointer' }}
          onClick={(e) => {
            e.stopPropagation();
            setRowSelected(record);
            setIsModalOpenDelete(true);
          }}
        />
      </div>
    );
  };

  const handleSearch = (confirm) => {
    confirm();
  };
  const handleReset = (clearFilters, confirm) => {
    clearFilters();
    confirm();
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(confirm)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(confirm)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters && handleReset(clearFilters, confirm)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => {
            var _a;
            return (_a = searchInput.current) === null || _a === void 0 ? void 0 : _a.select();
          }, 100);
        }
      },
    },
    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //     <Highlighter
    //       highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
    //       searchWords={[searchText]}
    //       autoEscape
    //       textToHighlight={text ? text.toString() : ''}
    //     />
    //   ) : (
    //     text
    //   ),
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
      filters: [
        {
          text: '>= 500',
          value: '>=',
        },
        {
          text: '<= 500',
          value: '<=',
        },
      ],
      onFilter: (value, record) => {
        if (value === '>=') {
          return record.price >= 500;
        } else if (value === '<=') {
          return record.price <= 500;
        }
      },
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      sorter: (a, b) => a.rating - b.rating,
      filters: [
        {
          text: '>= 3',
          value: '>=',
        },
        {
          text: '<= 3',
          value: '<=',
        },
      ],
      onFilter: (value, record) => {
        if (value === '>=') {
          return record.rating >= 3;
        } else if (value === '<=') {
          return record.rating <= 3;
        }
      },
    },
    {
      title: 'Type',
      dataIndex: 'type',
      ...getColumnSearchProps('type'),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record) => renderAction(record),
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
      discount: '',
      description: '',
      image: '',
    });
    form.resetFields();
  };

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  const handleCancelDeleteMany = () => {
    setIsModalOpenDeleteMany(false);
  };

  const handleDeleteProduct = () => {
    mutationDelete.mutate(
      { _id: rowSelected?._id, access_token: user?.access_token },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      },
    );
  };

  const handleDeleteManyProduct = () => {
    mutationDeleteMany.mutate(
      { ids: idsDelete, access_token: user?.access_token },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      },
    );
  };

  const onFinish = () => {
    const params = {
      name: stateProduct.name,
      type: stateProduct.type === 'add_type' ? stateProduct.newType : stateProduct.type,
      countInStock: stateProduct.countInStock,
      price: stateProduct.price,
      rating: stateProduct.rating,
      discount: stateProduct.discount,
      description: stateProduct.description,
      image: stateProduct.image,
    };
    mutation.mutate(params, {
      onSettled: () => {
        queryProduct.refetch();
      },
    });
  };

  const onUpdateProduct = () => {
    mutationUpdate.mutate(
      { _id: rowSelected?._id, stateProductDetails, access_token: user?.access_token },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      },
    );
  };

  const handleOnChange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnChangeSelect = (value) => {
    setStateProduct({
      ...stateProduct,
      type: value,
    });
  };

  const handleOnChangeDetails = (e) => {
    setStateProductDetails({
      ...stateProductDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnChangeImage = async ({ fileList }) => {
    const images = [];
    for (let file of fileList) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      images.push(file.preview);
    }
    setStateProduct({
      ...stateProduct,
      image: images,
    });
    form.setFieldsValue({ image: images });
  };

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateProductDetails({
      name: '',
      type: '',
      countInStock: '',
      price: '',
      rating: '',
      discount: '',
      description: '',
      image: [],
    });
    form.resetFields();
  };

  const handleOnChangeImageDetails = async ({ fileList }) => {
    const images = [];
    for (let file of fileList) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      images.push(file.preview);
    }
    setStateProductDetails({
      ...stateProductDetails,
      image: images,
    });
    form.setFieldsValue({ image: images });
  };

  const handleClickDeleteMany = (ids) => {
    setIdsDelete(ids);
    setIsModalOpenDeleteMany(true);
  };

  useEffect(() => {
    if (!isModalOpen) {
      form.setFieldsValue(stateProductDetails);
    } else {
      form.setFieldsValue(initial());
    }
  }, [stateProductDetails, isModalOpen]);

  useEffect(() => {
    if (rowSelected?._id) {
      fetchDetailsProduct(rowSelected?._id);
    }
  }, [rowSelected]);

  useEffect(() => {
    if (isSuccess && data.status === 'OK') {
      success('Tạo sản phẩm thành công');
      handleCancel();
    } else if (isError) {
      error('Tạo sản phẩm thất bại');
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated.status === 'OK') {
      success('Cập nhật sản phẩm thành công');
      handleCloseDrawer();
    } else if (isErrorUpdated) {
      error('Cập nhật sản phẩm thất bại');
    }
  }, [isSuccessUpdated, isErrorUpdated]);

  useEffect(() => {
    if (isSuccessDeleted && dataDeleted.status === 'OK') {
      success('Xoá sản phẩm thành công');
      handleCancelDelete();
    } else if (isErrorDeleted) {
      error('Xoá sản phẩm thất bại');
    }
  }, [isSuccessDeleted, isErrorDeleted]);

  useEffect(() => {
    if (isSuccessDeletedMany && dataDeletedMany.status === 'OK') {
      success('Xoá nhiều sản phẩm thành công');
      handleCancelDeleteMany();
    } else if (isErrorDeletedMany) {
      error('Xoá nhiều sản phẩm thất bại');
    }
  }, [isSuccessDeletedMany, isErrorDeletedMany]);

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
          handleDeleteManyProduct={handleDeleteManyProduct}
          handleClickDeleteMany={handleClickDeleteMany}
        />
      </div>
      <ModalComponent forceRender title="Tạo sản phẩm" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Loading isPending={isPending}>
          <Form
            name="product-create"
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
              <Select
                name="type"
                // defaultValue=""
                // style={{ width: 120 }}
                value={stateProduct.type}
                onChange={handleOnChangeSelect}
                options={renderOptions(typeProducts?.data)}
              />
            </Form.Item>

            {stateProduct.type === 'add_type' && (
              <Form.Item
                label="New Type"
                name="newType"
                rules={[{ required: true, message: 'Please input your New Type!' }]}
              >
                <InputComponent value={stateProduct.newType} onChange={handleOnChange} name="newType" />
              </Form.Item>
            )}

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
              label="Discount"
              name="discount"
              rules={[{ required: true, message: 'Please input your Discount of Product!' }]}
            >
              <InputComponent value={stateProduct.discount} onChange={handleOnChange} name="discount" />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: 'Please input your Description!' }]}
            >
              <InputTextAreaComponent
                value={stateProduct.description}
                onChange={handleOnChange}
                name="description"
                placeholder="Nhập mô tả sản phẩm..."
                rows={4}
                autoSize={{ minRows: 4, maxRows: 8 }}
              />
            </Form.Item>

            <Form.Item
              label="Images"
              name="image"
              rules={[
                { required: true, message: 'Vui lòng chọn ảnh sản phẩm!' },
                {
                  validator: (_, value) => {
                    if (value && value.length === 5) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Vui lòng chọn đủ 5 ảnh cho sản phẩm!'));
                  },
                },
              ]}
            >
              <div>
                <WrapperUploadFile onChange={handleOnChangeImage} maxCount={5} multiple fileList={[]}>
                  <ButtonComponent
                    textbutton={
                      stateProduct?.image && stateProduct.image.length > 0 ? 'Chọn lại 5 ảnh mới' : 'Chọn 5 ảnh sản phẩm'
                    }
                    style={{
                      backgroundColor: '#C68642',
                      color: '#FDF6EC',
                      border: 'none',
                      borderRadius: '4px',
                    }}
                  />
                </WrapperUploadFile>
              </div>
            </Form.Item>
            {stateProduct?.image && stateProduct.image.length > 0 && (
              <Form.Item label=" " colon={false}>
                <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {stateProduct.image.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      style={{
                        height: '60px',
                        width: '60px',
                        borderRadius: '8px',
                        objectFit: 'cover',
                        border: '1px solid #d9d9d9',
                      }}
                      alt={`Preview ${index + 1}`}
                    />
                  ))}
                </div>
                <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
                  Đã chọn: {stateProduct?.image?.length || 0}/5 ảnh
                </div>
              </Form.Item>
            )}

            <Form.Item label={null} wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </ModalComponent>
      <DrawerComponent
        title="Chi tiết sản phẩm"
        isOpen={isOpenDrawer}
        width="90%"
        onClose={() => setIsOpenDrawer(false)}
      >
        <Loading isPending={isPendingUpdated}>
          <Form
            name="product-update"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 22 }}
            onFinish={onUpdateProduct}
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
              label="Discount"
              name="discount"
              rules={[{ required: true, message: 'Please input your Discount of Product!' }]}
            >
              <InputComponent value={stateProductDetails.discount} onChange={handleOnChangeDetails} name="discount" />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: 'Please input your Description!' }]}
            >
              <InputTextAreaComponent
                value={stateProductDetails.description}
                onChange={handleOnChangeDetails}
                name="description"
                placeholder="Nhập mô tả sản phẩm..."
                rows={4}
                autoSize={{ minRows: 4, maxRows: 8 }}
              />
            </Form.Item>

            <Form.Item
              label="Images (5 ảnh)"
              name="image"
              rules={[
                { required: true, message: 'Vui lòng chọn ảnh sản phẩm!' },
                {
                  validator: (_, value) => {
                    if (value && value.length === 5) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Vui lòng chọn đủ 5 ảnh cho sản phẩm!'));
                  },
                },
              ]}
            >
              <div>
                <WrapperUploadFile onChange={handleOnChangeImageDetails} maxCount={5} multiple fileList={[]}>
                  <ButtonComponent
                    textbutton={
                      stateProductDetails?.image && stateProductDetails.image.length > 0
                        ? 'Chọn lại 5 ảnh mới'
                        : 'Chọn 5 ảnh sản phẩm'
                    }
                    style={{
                      backgroundColor: '#C68642',
                      color: '#FDF6EC',
                      border: 'none',
                      borderRadius: '4px',
                    }}
                  />
                </WrapperUploadFile>
              </div>
            </Form.Item>
            {stateProductDetails?.image && stateProductDetails.image.length > 0 && (
              <Form.Item label=" " colon={false}>
                <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {stateProductDetails.image.map((img, index) => (
                    <img
                      key={index}
                      src={img.url ? img.url : img}
                      style={{
                        height: '60px',
                        width: '60px',
                        borderRadius: '8px',
                        objectFit: 'cover',
                        border: '1px solid #d9d9d9',
                      }}
                      alt={`Preview ${index + 1}`}
                    />
                  ))}
                </div>
                <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
                  Đã chọn: {stateProductDetails?.image?.length || 0}/5 ảnh
                </div>
              </Form.Item>
            )}

            <Form.Item label={null} wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Apply
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </DrawerComponent>
      <ModalComponent
        forceRender
        title="Xoá sản phẩm"
        open={isModalOpenDelete}
        onCancel={handleCancelDelete}
        onOk={handleDeleteProduct}
      >
        <Loading isPending={isPendingDeleted}>
          <div>Bạn chắc chắn XOÁ sản phẩm này?</div>
        </Loading>
      </ModalComponent>
      <ModalComponent
        forceRender
        title="Xoá nhiều sản phẩm"
        open={isModalOpenDeleteMany}
        onCancel={handleCancelDeleteMany}
        onOk={handleDeleteManyProduct}
      >
        <Loading isPending={isPendingDeletedMany}>
          <div>Bạn chắc chắn XOÁ nhiều sản phẩm này?</div>
        </Loading>
      </ModalComponent>
    </div >
  );
};

export default AdminProduct;
