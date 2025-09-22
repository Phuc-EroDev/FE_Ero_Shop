import React, { useEffect, useRef, useState } from 'react';
import { WrapperHeader } from './style';
import { Button, Space } from 'antd';
import { CheckSquareOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import TableComponent from '../TableComponent/TableComponent';
import InputComponent from '../InputComponent/InputComponent';
import Loading from '../LoadingComponent/Loading';
import ModalComponent from '../ModalComponent/ModalComponent';
import { useMessage } from '../../context/MessageContext.jsx';
import * as OrderService from '../../services/OrderService';
import { useSelector } from 'react-redux';
import { useMutationHook } from '../../hooks/useMutationHook';
import { useQuery } from '@tanstack/react-query';
import { orderConstants } from '../../constant';
import PieChartComponent from '../PieChartComponent/PieChartComponent';

const AdminOrder = () => {
  const user = useSelector((state) => state?.user);
  const { success, error, warning } = useMessage();

  const searchInput = useRef(null);

  const [idsDelete, setIdsDelete] = useState([]);
  const [rowSelected, setRowSelected] = useState('');
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [isModalOpenDeleteMany, setIsModalOpenDeleteMany] = useState(false);

  const fetchOrderAll = async () => {
    const response = await OrderService.getAllOrder(user?.access_token);
    return response;
  };

  const mutationDelete = useMutationHook((data) => {
    const { _id, access_token } = data;
    return OrderService.cancelOrder(_id, access_token);
  });

  const mutationDeleteMany = useMutationHook((data) => {
    const { ids, access_token } = data;
    return OrderService.deleteManyOrder(ids, access_token);
  });

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

  const queryOrder = useQuery({
    queryKey: ['order'],
    queryFn: fetchOrderAll,
  });
  const { isLoading: isLoadingOrders, data: orders } = queryOrder;

  const mutationDelivery = useMutationHook((data) => {
    const { orderId, access_token } = data;
    return OrderService.updateDeliveryStatus(orderId, access_token);
  });

  const renderAction = (record) => {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px' }}>
        {!record.isDelivered && (
          <CheckSquareOutlined
            style={{ color: 'green', fontSize: '20px', cursor: 'pointer' }}
            onClick={(e) => {
              e.stopPropagation();
              setRowSelected(record);
              handleConfirmDelivery(record._id);
            }}
            title="Xác nhận giao hàng"
          />
        )}
        <DeleteOutlined
          style={{ color: 'red', fontSize: '20px', cursor: 'pointer' }}
          onClick={(e) => {
            e.stopPropagation();
            setRowSelected(record);
            setIsModalOpenDelete(true);
          }}
          title="Xóa đơn hàng"
        />
      </div>
    );
  };

  const handleConfirmDelivery = (orderId) => {
    mutationDelivery.mutate(
      { orderId, access_token: user?.access_token },
      {
        onSuccess: (data) => {
          if (data?.status === 'OK') {
            success('Xác nhận giao hàng thành công!');
            queryOrder.refetch();
          } else {
            error(data?.message || 'Có lỗi xảy ra');
          }
        },
        onError: () => {
          error('Có lỗi xảy ra khi xác nhận giao hàng');
        },
      },
    );
  };

  const handleClickDeleteMany = (ids) => {
    setIdsDelete(ids);
    setIsModalOpenDeleteMany(true);
  };

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  const handleCancelDeleteMany = () => {
    setIsModalOpenDeleteMany(false);
  };

  const handleDeleteOrder = () => {
    mutationDelete.mutate(
      { _id: rowSelected?._id, access_token: user?.access_token },
      {
        onSettled: () => {
          queryOrder.refetch();
        },
      },
    );
  };

  const handleDeleteManyOrder = () => {
    mutationDeleteMany.mutate(
      { ids: idsDelete, access_token: user?.access_token },
      {
        onSettled: () => {
          queryOrder.refetch();
        },
      },
    );
  };

  const handleSearch = (confirm) => {
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
          <Button
            onClick={() => clearFilters && handleReset(clearFilters, confirm)}
            size="small"
            style={{ width: 90, marginLeft: 8 }}
          >
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
  });

  const columns = [
    {
      title: 'Id order',
      dataIndex: '_id',
      render: (text) => <a>{text?.slice(-8)}</a>,
      ...getColumnSearchProps('_id'),
    },
    {
      title: 'User name',
      dataIndex: 'userName',
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.userName.length - b.userName.length,
      ...getColumnSearchProps('userName'),
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
      title: 'Price total (đ)',
      dataIndex: 'totalPrice',
      render: (text) => <div>{text.toLocaleString()}</div>,
      sorter: (a, b) => a.totalPrice - b.totalPrice,
    },
    {
      title: 'Shipping method',
      dataIndex: 'shippingMethod',
      render: (text) => <div>{text}</div>,
      filters: [
        {
          text: 'fast',
          value: 'fast',
        },
        {
          text: 'ghtk',
          value: 'ghtk',
        },
        {
          text: 'gojek',
          value: 'gojek',
        },
      ],
      onFilter: (value, record) => {
        if (value === 'fast') {
          return record.shippingMethod === 'fast';
        } else if (value === 'ghtk') {
          return record.shippingMethod === 'ghtk';
        } else if (value === 'gojek') {
          return record.shippingMethod === 'gojek';
        }
      },
    },
    {
      title: 'Payment method',
      dataIndex: 'paymentMethod',
      render: (text) => <div>{text}</div>,
      filters: [
        {
          text: 'cod',
          value: 'cod',
        },
        {
          text: 'paypal',
          value: 'paypal',
        },
      ],
      onFilter: (value, record) => {
        if (value === 'cod') {
          return record.paymentMethod === 'cod';
        } else if (value === 'paypal') {
          return record.paymentMethod === 'paypal';
        }
      },
    },
    {
      title: 'Paided',
      dataIndex: 'isPaid',
      render: (text) => <div>{text ? 'true' : <div style={{ color: 'red' }}>{'false'}</div>}</div>,
      filters: [
        {
          text: 'is Paided',
          value: true,
        },
        {
          text: 'Not Paided',
          value: false,
        },
      ],
      onFilter: (value, record) => {
        if (value === true) {
          return record.isPaid === true;
        } else if (value === false) {
          return record.isPaid === false;
        }
      },
    },
    {
      title: 'Shipped',
      dataIndex: 'isDelivered',
      render: (text) => <div>{text ? 'true' : <div style={{ color: 'red' }}>{'false'}</div>}</div>,
      filters: [
        {
          text: 'Delivered',
          value: true,
        },
        {
          text: 'Not Delivered',
          value: false,
        },
      ],
      onFilter: (value, record) => {
        if (value === true) {
          return record.isDelivered === true;
        } else if (value === false) {
          return record.isDelivered === false;
        }
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record) => renderAction(record),
    },
  ];

  const dataTable =
    orders?.data?.length > 0 &&
    orders?.data?.map((order) => {
      return {
        ...order,
        key: order?._id,
        userName: order?.shippingAddress?.fullName,
        phone: order?.shippingAddress?.phone,
        address: order?.shippingAddress?.address,
      };
    });

  useEffect(() => {
    if (isSuccessDeleted && dataDeleted.status === 'OK') {
      message.success('Xoá đơn hàng thành công');
      handleCancelDelete();
    } else if (isErrorDeleted) {
      message.error('Xoá đơn hàng thất bại');
    }
  }, [isSuccessDeleted, isErrorDeleted]);

  useEffect(() => {
    if (isSuccessDeletedMany && dataDeletedMany.status === 'OK') {
      message.success('Xoá nhiều đơn hàng thành công');
      handleCancelDeleteMany();
    } else if (isErrorDeletedMany) {
      message.error('Xoá nhiều đơn hàng thất bại');
    }
  }, [isSuccessDeletedMany, isErrorDeletedMany]);

  return (
    <div>
      <WrapperHeader>Quản Lý Đơn Hàng</WrapperHeader>
      <div style={{ marginTop: '20px' }}>
        <TableComponent
          columns={columns}
          data={dataTable}
          isLoading={isLoadingOrders}
          handleDeleteManyOrder={handleDeleteManyOrder}
          handleClickDeleteMany={handleClickDeleteMany}
        />
      </div>
      <ModalComponent
        forceRender
        title="Xoá sản phẩm"
        open={isModalOpenDelete}
        onCancel={handleCancelDelete}
        onOk={handleDeleteOrder}
      >
        <Loading isPending={isPendingDeleted}>
          <div>Bạn chắc chắn XOÁ sản phẩm này?</div>
        </Loading>
      </ModalComponent>
      <ModalComponent
        forceRender
        title="Xoá nhiều đơn hàng"
        open={isModalOpenDeleteMany}
        onCancel={handleCancelDeleteMany}
        onOk={handleDeleteManyOrder}
      >
        <Loading isPending={isPendingDeletedMany}>
          <div>Bạn chắc chắn XOÁ nhiều đơn hàng này?</div>
        </Loading>
      </ModalComponent>
    </div>
  );
};

export default AdminOrder;
