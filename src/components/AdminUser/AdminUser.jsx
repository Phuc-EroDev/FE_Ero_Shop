import React, { useEffect, useRef, useState } from 'react';
import { WrapperHeader, WrapperUploadFile } from './style';
import { Button, Form, Space } from 'antd';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import TableComponent from '../TableComponent/TableComponent';
import InputComponent from '../InputComponent/InputComponent';
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import Loading from '../LoadingComponent/Loading';
import ModalComponent from '../ModalComponent/ModalComponent';
import { getBase64 } from '../../utils';
import * as message from '../../components/MessageComponent/Message';
import * as UserService from '../../services/UserService';
import { useSelector } from 'react-redux';
import { useMutationHook } from '../../hooks/useMutationHook';
import { useQuery } from '@tanstack/react-query';

const AdminUser = () => {
  const searchInput = useRef(null);

  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [isModalOpenDeleteMany, setIsModalOpenDeleteMany] = useState(false);
  const [idsDelete, setIdsDelete] = useState([]);
  const [rowSelected, setRowSelected] = useState('');
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [stateUserDetails, setStateUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    isAdmin: false,
    address: '',
    avatar: '',
  });

  const user = useSelector((state) => state?.user);

  const [form] = Form.useForm();

  const mutationUpdate = useMutationHook((data) => {
    const { _id, access_token, ...rests } = data;
    const newData = rests.stateUserDetails;
    return UserService.updateUser(_id, newData, access_token);
  });

  const mutationDelete = useMutationHook((data) => {
    const { _id, access_token } = data;
    return UserService.deleteUser(_id, access_token);
  });

  const mutationDeleteMany = useMutationHook((data) => {
    const { ids, access_token } = data;
    return UserService.deleteManyUser(ids, access_token);
  });

  const fetchUserAll = async () => {
    const response = await UserService.getAllUser(user?.access_token);
    return response;
  };

  const fetchDetailsUser = async (id) => {
    const response = await UserService.getDetailsUser(id);
    if (response?.data) {
      setStateUserDetails({
        name: response?.data?.name,
        email: response?.data?.email,
        phone: response?.data?.phone,
        isAdmin: response?.data?.isAdmin,
        address: response?.data?.address,
        avatar: response?.data?.avatar,
      });
    }
    return response;
  };

  const handleDetailUser = () => {
    setIsOpenDrawer(true);
  };

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

  const queryUser = useQuery({
    queryKey: ['user'],
    queryFn: fetchUserAll,
  });
  const { isLoading: isLoadingUsers, data: users } = queryUser;

  const renderAction = (record) => {
    return (
      <div>
        <EditOutlined
          style={{ color: 'orange', fontSize: '24px', marginRight: '12px', cursor: 'pointer' }}
          onClick={(e) => {
            e.stopPropagation();
            setRowSelected(record);
            handleDetailUser();
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
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.email.length - b.email.length,
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Admin',
      dataIndex: 'isAdmin',
      render: (text) => <div>{text ? 'true' : 'false'}</div>,
      filters: [
        {
          text: 'is Admin',
          value: true,
        },
        {
          text: 'is Not Admin',
          value: false,
        },
      ],
      onFilter: (value, record) => {
        if (value === true) {
          return record.isAdmin === true;
        } else if (value === false) {
          return record.isAdmin === false;
        }
      },
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      ...getColumnSearchProps('phone'),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      ...getColumnSearchProps('address'),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      render: (text) => {
        const date = new Date(text);
        return date.toLocaleDateString('vi-VN');
      },
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record) => renderAction(record),
    },
  ];

  const dataTable =
    users?.data?.length > 0 &&
    users?.data?.map((user) => {
      return { ...user, key: user._id };
    });

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  const handleCancelDeleteMany = () => {
    setIsModalOpenDeleteMany(false);
  };

  const handleDeleteUser = () => {
    mutationDelete.mutate(
      { _id: rowSelected?._id, access_token: user?.access_token },
      {
        onSettled: () => {
          queryUser.refetch();
        },
      },
    );
  };

  const handleDeleteManyUser = () => {
    mutationDeleteMany.mutate(
      { ids: idsDelete, access_token: user?.access_token },
      {
        onSettled: () => {
          queryUser.refetch();
        },
      },
    );
  };

  const onUpdateUser = () => {
    mutationUpdate.mutate(
      { _id: rowSelected?._id, stateUserDetails, access_token: user?.access_token },
      {
        onSettled: () => {
          queryUser.refetch();
        },
      },
    );
  };

  const handleOnChangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateUserDetails({
      name: '',
      email: '',
      phone: '',
      isAdmin: false,
    });
    form.resetFields();
  };

  const handleOnChangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateUserDetails({
      ...stateUserDetails,
      avatar: file.preview,
    });
  };

  const handleClickDeleteMany = (ids) => {
    setIdsDelete(ids);
    setIsModalOpenDeleteMany(true);
  };

  useEffect(() => {
    form.setFieldsValue(stateUserDetails);
  }, [stateUserDetails]);

  useEffect(() => {
    if (rowSelected?._id) {
      fetchDetailsUser(rowSelected?._id);
    }
  }, [rowSelected]);

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated.status === 'OK') {
      message.success('Cập nhật người dùng thành công');
      handleCloseDrawer();
    } else if (isErrorUpdated) {
      message.error('Cập nhật người dùng thất bại');
    }
  }, [isSuccessUpdated, isErrorUpdated]);

  useEffect(() => {
    if (isSuccessDeleted && dataDeleted.status === 'OK') {
      message.success('Xoá người dùng thành công');
      handleCancelDelete();
    } else if (isErrorDeleted) {
      message.error('Xoá người dùng thất bại');
    }
  }, [isSuccessDeleted, isErrorDeleted]);

  useEffect(() => {
    if (isSuccessDeletedMany && dataDeletedMany.status === 'OK') {
      message.success('Xoá nhiều tài khoản thành công');
      handleCancelDeleteMany();
    } else if (isErrorDeletedMany) {
      message.error('Xoá nhiều tài khoản thất bại');
    }
  }, [isSuccessDeletedMany, isErrorDeletedMany]);

  return (
    <div>
      <WrapperHeader>Quản Lý Người Dùng</WrapperHeader>
      <div style={{ marginTop: '20px' }}>
        <TableComponent
          columns={columns}
          data={dataTable}
          isLoading={isLoadingUsers}
          handleClickDeleteMany={handleClickDeleteMany}
        />
      </div>
      <DrawerComponent
        title="Chi tiết người dùng"
        isOpen={isOpenDrawer}
        width="90%"
        onClose={() => setIsOpenDrawer(false)}
      >
        <Loading isPending={isPendingUpdated}>
          <Form
            name="basic"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 22 }}
            onFinish={onUpdateUser}
            autoComplete="on"
            form={form}
          >
            <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your Name!' }]}>
              <InputComponent value={stateUserDetails.name} onChange={handleOnChangeDetails} name="name" />
            </Form.Item>

            <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your Email!' }]}>
              <InputComponent value={stateUserDetails.email} onChange={handleOnChangeDetails} name="email" />
            </Form.Item>

            <Form.Item label="Phone" name="phone" rules={[{ required: true, message: 'Please input your Phone!' }]}>
              <InputComponent value={stateUserDetails.phone} onChange={handleOnChangeDetails} name="phone" />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: 'Please input your Address!' }]}
            >
              <InputComponent value={stateUserDetails.address} onChange={handleOnChangeDetails} name="address" />
            </Form.Item>

            <Form.Item label="Avatar" name="avatar" rules={[{ required: true, message: 'Please input your Avatar!' }]}>
              <WrapperUploadFile onChange={handleOnChangeAvatarDetails} maxCount={1}>
                <Button>Select File</Button>
                {stateUserDetails?.avatar && (
                  <img
                    src={stateUserDetails?.avatar}
                    style={{
                      height: '60px',
                      width: '60px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      marginLeft: '10px',
                    }}
                    alt="Avatar Preview"
                  />
                )}
              </WrapperUploadFile>
            </Form.Item>

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
        title="Xoá người dùng"
        open={isModalOpenDelete}
        onCancel={handleCancelDelete}
        onOk={handleDeleteUser}
      >
        <Loading isPending={isPendingDeleted}>
          <div>Bạn chắc chắn XOÁ tài khoản này?</div>
        </Loading>
      </ModalComponent>
      <ModalComponent
        forceRender
        title="Xoá nhiều tài khoản"
        open={isModalOpenDeleteMany}
        onCancel={handleCancelDeleteMany}
        onOk={handleDeleteManyUser}
      >
        <Loading isPending={isPendingDeletedMany}>
          <div>Bạn chắc chắn XOÁ nhiều tài khoản này?</div>
        </Loading>
      </ModalComponent>
    </div>
  );
};

export default AdminUser;
