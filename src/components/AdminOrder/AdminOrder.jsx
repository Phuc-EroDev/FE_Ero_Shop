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
import * as OrderService from '../../services/OrderService';
import { useSelector } from 'react-redux';
import { useMutationHook } from '../../hooks/useMutationHook';
import { useQuery } from '@tanstack/react-query';
import { orderConstants } from '../../constant';
import PieChartComponent from '../PieChartComponent/PieChartComponent';

const AdminOrder = () => {
  const user = useSelector((state) => state?.user);

  const fetchOrderAll = async () => {
    const response = await OrderService.getAllOrder(user?.access_token);
    return response;
  };

  const queryOrder = useQuery({
    queryKey: ['order'],
    queryFn: fetchOrderAll,
  });
  const { isLoading: isLoadingOrders, data: orders } = queryOrder;

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <InputComponent
          // ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(confirm)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            // onClick={() => handleSearch(confirm)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            // onClick={() => clearFilters && handleReset(clearFilters, confirm)}
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
      render: (text) => <a>{text}</a>,
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
      title: 'Price total (VND)',
      dataIndex: 'totalPrice',
      render: (text) => <div>{text.toLocaleString()}</div>,
      ...getColumnSearchProps('totalPrice'),
    },
    {
      title: 'Shipping method',
      dataIndex: 'shippingMethod',
      render: (text) => <div>{'Fast'}</div>,
      ...getColumnSearchProps('shippingMethod'),
    },
    {
      title: 'Payment method',
      dataIndex: 'paymentMethod',
      render: (text) => <div>{orderConstants.payment[text]}</div>,
      ...getColumnSearchProps('paymentMethod'),
    },
    {
      title: 'Paided',
      dataIndex: 'isPaid',
      render: (text) => <div>{text ? 'true' : <div style={{ color: 'red' }}>{'false'}</div>}</div>,
      ...getColumnSearchProps('isPaid'),
    },
    {
      title: 'Shipped',
      dataIndex: 'isDelivered',
      render: (text) => <div>{text ? 'true' : <div style={{ color: 'red' }}>{'false'}</div>}</div>,
      ...getColumnSearchProps('isDelivered'),
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

  return (
    <div>
      <WrapperHeader>Quản Lý Đơn Hàng</WrapperHeader>
      <div style={{ width: '100%', height: '200px' }}>
        <PieChartComponent data={orders?.data} />
      </div>
      <div style={{ marginTop: '20px' }}>
        <TableComponent columns={columns} data={dataTable} isLoading={isLoadingOrders} />
      </div>
    </div>
  );
};

export default AdminOrder;
