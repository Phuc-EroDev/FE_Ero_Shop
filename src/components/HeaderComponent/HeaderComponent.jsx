import React, { useEffect, useState } from 'react';
import { Badge, Col, Popover } from 'antd';
import {
  WrapperHeader,
  WrapperTextHeader,
  WrapperHeaderAccount,
  WrapperTextHeaderSmall,
  WrapperContentPopup,
} from './style.js';
import { CaretDownOutlined, UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch.jsx';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../services/UserService';
import { resetUser } from '../../redux/slides/userSlide.js';
import Loading from '../LoadingComponent/Loading.jsx';
import { searchProduct } from '../../redux/slides/productSlide.js';

const HeaderComponent = ({ isHiddenSearch = false, isHiddenCard = false }) => {
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  // const [search, setSearch] = useState('');

  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const order = useSelector((state) => state?.order);
  const handleNavigateLogin = () => {
    navigate('/sign-in');
  };

  const handleLogout = async () => {
    setLoading(true);
    await UserService.logoutUser();
    dispatch(resetUser());
    setLoading(false);
  };

  const content = (
    <div>
      <WrapperContentPopup onClick={() => navigate('/profile-user')}>Thông tin người dùng</WrapperContentPopup>
      {user?.isAdmin && (
        <WrapperContentPopup onClick={() => navigate('/system/admin')}>Quản Lý Hệ Thống</WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={handleLogout}>Đăng xuất</WrapperContentPopup>
    </div>
  );

  const onSearch = (e) => {
    // setSearch(e.target.value);
    dispatch(searchProduct(e.target.value));
  };

  useEffect(() => {
    setLoading(true);
    setUserName(user?.name);
    setUserAvatar(user?.avatar);
    setLoading(false);
  }, [user?.name, user?.avatar]);

  return (
    <div>
      <WrapperHeader style={{ justifyContent: isHiddenSearch && isHiddenCard ? 'space-between' : 'unset' }}>
        <Col span={5}>
          <WrapperTextHeader onClick={() => navigate('/')}>ERO-SHOP</WrapperTextHeader>
        </Col>
        {!isHiddenSearch && (
          <Col span={13}>
            <ButtonInputSearch
              size="large"
              placeholder="input search text"
              textbutton="Search"
              allowClear
              onChange={onSearch}
            />
          </Col>
        )}
        <Col span={6} style={{ display: 'flex', gap: '54px', alignItems: 'center' }}>
          <Loading isPending={loading}>
            <WrapperHeaderAccount>
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt="Avatar"
                  style={{ height: '30px', width: '30px', borderRadius: '50%', objectFit: 'cover' }}
                />
              ) : (
                <UserOutlined style={{ fontSize: '30px' }} />
              )}
              {user?.access_token ? (
                <>
                  <Popover content={content} trigger="click">
                    <div style={{ cursor: 'pointer' }}>{userName?.length ? userName : user?.email}</div>
                  </Popover>
                </>
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
          </Loading>
          {!isHiddenCard && (
            <div
              onClick={() => navigate('/order')}
              style={{ display: 'flex', gap: '10px', alignItems: 'center', cursor: 'pointer' }}
            >
              <Badge count={order?.orderItems?.length} size="small">
                <ShoppingCartOutlined style={{ fontSize: '30px', color: '#FDF6EC' }} />
              </Badge>
              <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
            </div>
          )}
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default HeaderComponent;
