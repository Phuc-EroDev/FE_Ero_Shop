import { Menu } from 'antd';
import React, { useState } from 'react';
import { getItem } from '../../utils';
import { AppstoreOutlined, UserOutlined } from '@ant-design/icons';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';

const AdminPage = () => {
  const items = [
    getItem('Người dùng', 'user', <UserOutlined />, [
      getItem('Option 1', '1'),
      getItem('Option 2', '2'),
      getItem('Option 3', '3'),
      getItem('Option 4', '4'),
    ]),
    getItem('Sản phẩm', 'product', <AppstoreOutlined />, [
      getItem('Option 5', '5'),
      getItem('Option 6', '6'),
      getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
    ]),
  ];

  const rootSubmenuKeys = ['user', 'product'];
  const [openKeys, setOpenKeys] = useState(['user']);
  const [keySelected, setKeySelected] = useState('');

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const handleOnClick = ({ key }) => {
    setKeySelected(key);
  };

  return (
    <>
      <HeaderComponent isHiddenSearch isHiddenCard />
      <div style={{ display: 'flex' }}>
        <Menu
          theme={'dark'}
          mode="inline"
          onOpenChange={onOpenChange}
          style={{ width: 256 }}
          items={items}
          onClick={handleOnClick}
        />
        <div>{keySelected === '6' && <span>Key la 6</span>}</div>
      </div>
    </>
  );
};

export default AdminPage;
