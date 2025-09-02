import React, { useState } from 'react';
import { getItem } from '../../utils';
import { AppstoreOutlined, DashboardOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import { WrapperMenu } from './style';
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminProduct from '../../components/AdminProduct/AdminProduct';
import AdminOrder from '../../components/AdminOrder/AdminOrder';
import AdminDashboard from '../../components/AdminDashboard/AdminDashboard';

const AdminPage = () => {
  const items = [
    getItem('Thống kê', 'dashboard', <DashboardOutlined />),
    getItem('Người dùng', 'user', <UserOutlined />),
    getItem('Sản phẩm', 'product', <AppstoreOutlined />),
    getItem('Đơn hàng', 'order', <ShoppingCartOutlined />),
  ];

  const [keySelected, setKeySelected] = useState('dashboard');

  const renderPage = (key) => {
    switch (key) {
      case 'user':
        return <AdminUser />;
      case 'product':
        return <AdminProduct />;
      case 'order':
        return <AdminOrder />;
      default:
        return <AdminDashboard />;
    }
  };

  const handleOnClick = ({ key }) => {
    setKeySelected(key);
  };

  return (
    <>
      <HeaderComponent isHiddenSearch isHiddenCard />
      <div style={{ position: 'relative', display: 'flex', marginTop: '60px' }}>
        <WrapperMenu theme={'dark'} mode="inline" items={items} onClick={handleOnClick} />
        <div style={{ flex: 1, padding: '16px', marginLeft: '256px', minHeight: 'calc(100vh - 64px)' }}>
          {renderPage(keySelected)}
        </div>
      </div>
    </>
  );
};

export default AdminPage;
