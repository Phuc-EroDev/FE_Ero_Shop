import React from 'react';
import { Badge, Col } from 'antd';
import { WrapperHeader, WrapperTextHeader, WrapperHeaderAccount, WrapperTextHeaderSmall } from './style.js';
import { CaretDownOutlined, UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch.jsx';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const HeaderComponent = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const handleNavigateLogin = () => {
    navigate('/sign-in');
  };

  return (
    <div>
      <WrapperHeader>
        <Col span={5}>
          <WrapperTextHeader>ERO-SHOP</WrapperTextHeader>
        </Col>
        <Col span={13}>
          <ButtonInputSearch size="large" placeholder="input search text" textButton="Search" allowClear />
        </Col>
        <Col span={6} style={{ display: 'flex', gap: '54px', alignItems: 'center' }}>
          <WrapperHeaderAccount>
            <UserOutlined style={{ fontSize: '30px' }} />
            {user?.name ? (
              <div style={{ cursor: 'pointer' }}>{user.name}</div>
            ) : (
              <div onClick={handleNavigateLogin}>
                <WrapperTextHeaderSmall>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
                <div>
                  <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                  <CaretDownOutlined />
                </div>
              </div>
            )}
          </WrapperHeaderAccount>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Badge count={5} size="small">
              <ShoppingCartOutlined style={{ fontSize: '30px', color: '#FDF6EC' }} />
            </Badge>
            <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
          </div>
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default HeaderComponent;
