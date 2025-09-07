import React, { useState } from 'react';
import { getItem } from '../../utils';
import { AppstoreOutlined, DashboardOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import { WrapperMenu, WrapperAdminContainer, WrapperAdminContent } from './style';
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
      <WrapperAdminContainer>
        <WrapperMenu theme={'dark'} mode="inline" items={items} onClick={handleOnClick} />
        <WrapperAdminContent>
          {renderPage(keySelected)}
        </WrapperAdminContent>
      </WrapperAdminContainer>
    </>
  );
};

export default AdminPage;
