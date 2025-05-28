import React, { useState } from 'react';
import { getItem } from '../../utils';
import { AppstoreOutlined, UserOutlined } from '@ant-design/icons';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import { WrapperMenu } from './style';
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminProduct from '../../components/AdminProduct/AdminProduct';

const AdminPage = () => {
  const items = [getItem('Người dùng', 'user', <UserOutlined />), getItem('Sản phẩm', 'product', <AppstoreOutlined />)];

  // const rootSubmenuKeys = ['user', 'product'];
  const [keySelected, setKeySelected] = useState('');

  const renderPage = (key) => {
    switch (key) {
      case 'user':
        return <AdminUser />;
      case 'product':
        return <AdminProduct />;
      default:
        return <></>;
    }
  };

  const handleOnClick = ({ key }) => {
    setKeySelected(key);
  };

  return (
    <>
      <HeaderComponent isHiddenSearch isHiddenCard />
      <div style={{ display: 'flex' }}>
        <WrapperMenu theme={'dark'} mode="inline" items={items} onClick={handleOnClick} />
        <div style={{ flex: 1, padding: '16px' }}>{renderPage(keySelected)}</div>
      </div>
    </>
  );
};

export default AdminPage;
