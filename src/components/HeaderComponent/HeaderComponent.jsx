import React, { useEffect, useState } from 'react';
import { Badge, Col, Popover, Drawer, Divider } from 'antd';
import {
  GlobalStyle,
  WrapperHeader,
  WrapperTextHeader,
  WrapperHeaderAccount,
  WrapperTextHeaderSmall,
  WrapperContentPopup,
  HeaderActions,
  UserNameText,
  CartLabel,
  MenuIconWrapper,
} from './style.js';
import { CaretDownOutlined, UserOutlined, ShoppingCartOutlined, HomeOutlined, LoginOutlined, ProfileOutlined, AppstoreOutlined, MenuOutlined } from '@ant-design/icons';
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
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const order = useSelector((state) => state?.order);

  const handleNavigateLogin = () => {
    navigate('/sign-in');
    setDrawerVisible(false);
  };

  const handleLogout = async () => {
    setLoading(true);
    await UserService.logoutUser();
    dispatch(resetUser());
    setLoading(false);
    setDrawerVisible(false);
  };

  const content = (
    <div style={{ maxWidth: '90vw', boxSizing: 'border-box' }}>
      <WrapperContentPopup onClick={() => handleClickNavigate('profile')}>Thông tin người dùng</WrapperContentPopup>
      {user?.isAdmin && (
        <WrapperContentPopup onClick={() => handleClickNavigate('admin')}>Quản Lý Hệ Thống</WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={() => handleClickNavigate('my-order')}>Đơn hàng của tôi</WrapperContentPopup>
      <WrapperContentPopup onClick={() => handleClickNavigate('logout')}>Đăng xuất</WrapperContentPopup>
    </div>
  );

  const handleClickNavigate = (type) => {
    switch (type) {
      case 'profile':
        navigate('/profile-user');
        break;

      case 'admin':
        navigate('/system/admin');
        break;

      case 'my-order':
        navigate('/my-order', {
          state: {
            id: user?.id,
            access_token: user?.access_token,
          },
        });
        break;

      case 'logout':
        handleLogout();
        handleNavigateLogin();
        break;

      default:
        break;
    }
    setIsOpenPopover(false);
    setDrawerVisible(false);
  };

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

  // Mobile Drawer Menu Content
  const drawerContent = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div onClick={() => handleClickNavigate('home')} style={{ fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
        Trang chủ
      </div>

      {user?.access_token ? (
        <>
          <div onClick={() => handleClickNavigate('profile')} style={{ fontSize: '16px', cursor: 'pointer' }}>
            Thông tin người dùng
          </div>

          {user?.isAdmin && (
            <div onClick={() => handleClickNavigate('admin')} style={{ fontSize: '16px', cursor: 'pointer' }}>
              Quản Lý Hệ Thống
            </div>
          )}

          <div onClick={() => handleClickNavigate('my-order')} style={{ fontSize: '16px', cursor: 'pointer' }}>
            Đơn hàng của tôi
          </div>

          <div onClick={() => handleClickNavigate('logout')} style={{ fontSize: '16px', cursor: 'pointer' }}>
            Đăng xuất
          </div>
        </>
      ) : (
        <div onClick={handleNavigateLogin} style={{ fontSize: '16px', cursor: 'pointer' }}>
          Đăng nhập/Đăng ký
        </div>
      )}

      {!isHiddenCard && (
        <div
          onClick={() => {
            navigate('/order');
            setDrawerVisible(false);
          }}
          style={{ fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <span>Giỏ hàng</span>
          <Badge count={order?.orderItems?.length} size="small">
            <ShoppingCartOutlined style={{ fontSize: '20px' }} />
          </Badge>
        </div>
      )}

      {!isHiddenSearch && (
        <div style={{ marginTop: '16px' }}>
          <ButtonInputSearch
            size="middle"
            placeholder="Tìm kiếm"
            textbutton="Tìm"
            allowClear
            onChange={onSearch}
          />
        </div>
      )}
    </div>
  );

  return (
    <div style={{ width: '100%', margin: 0, padding: 0 }}>
      <GlobalStyle />
      <WrapperHeader gutter={0}>
        {/* Mobile: left hamburger menu - only visible on mobile */}
        <Col xs={4} sm={4} md={0} lg={0} xl={0} style={{ padding: 0 }}>
          <MenuIconWrapper>
            <MenuOutlined onClick={() => setIsMenuOpen(true)} style={{ fontSize: 22, color: '#FDF6EC', cursor: 'pointer' }} />
          </MenuIconWrapper>
        </Col>

        {/* Logo - properly aligned on all devices */}
        <Col xs={8} sm={8} md={5} lg={5} xl={5} style={{ padding: 0 }}>
          <WrapperTextHeader onClick={() => navigate('/')}>ERO-SHOP</WrapperTextHeader>
        </Col>

        {/* Search Bar - Hide on mobile */}
        {!isHiddenSearch && (
          <Col xs={0} sm={0} md={13} lg={13} xl={13}>
            <ButtonInputSearch
              size="large"
              placeholder="input search text"
              textbutton="Search"
              allowClear
              onChange={onSearch}
            />
          </Col>
        )}
        {/* Right actions: cart then avatar */}
        <Col xs={12} sm={12} md={6} lg={6} xl={6} style={{ display: 'flex', justifyContent: 'flex-end', padding: 0 }}>
          <HeaderActions>
            {!isHiddenCard && (
              <div
                onClick={() => navigate('/order')}
                style={{ display: 'flex', gap: '10px', alignItems: 'center', cursor: 'pointer' }}
              >
                <Badge count={order?.orderItems?.length} size="small">
                  <ShoppingCartOutlined style={{ fontSize: '30px', color: '#FDF6EC' }} />
                </Badge>
                <CartLabel>Giỏ hàng</CartLabel>
              </div>
            )}
            <Loading isPending={loading}>
              <WrapperHeaderAccount>
                {user?.access_token ? (
                  <Popover
                    content={content}
                    trigger="click"
                    open={isOpenPopover}
                    onOpenChange={(visible) => setIsOpenPopover(visible)}
                    overlayStyle={{ position: 'fixed' }}
                    placement="bottomRight"
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                      {userAvatar ? (
                        <img src={userAvatar} alt="Avatar" style={{ margin: 0 }} />
                      ) : (
                        <UserOutlined style={{ fontSize: '30px', color: '#FDF6EC', margin: 0 }} />
                      )}
                      <UserNameText>{userName?.length ? userName : user?.email}</UserNameText>
                    </div>
                  </Popover>
                ) : (
                  <div onClick={handleNavigateLogin} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                    <UserOutlined style={{ fontSize: '30px', color: '#FDF6EC', margin: 0 }} />
                    <div>
                      <WrapperTextHeaderSmall>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
                      <div>
                        <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                        <CaretDownOutlined />
                      </div>
                    </div>
                  </div>
                )}
              </WrapperHeaderAccount>
            </Loading>
          </HeaderActions>
        </Col>
      </WrapperHeader>

      {/* Mobile Drawer Menu - only opens on mobile */}
      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setIsMenuOpen(false)}
        open={isMenuOpen}
        styles={{
          body: {
            padding: 16,
            backgroundColor: '#212528',
            color: '#ffffff'
          },
          header: {
            backgroundColor: '#212528',
            color: '#ffffff',
            borderBottom: '1px solid #3a3a3a'
          },
          wrapper: {
            backgroundColor: '#212528'
          },
          content: {
            backgroundColor: '#212528'
          }
        }}
        width="80%"
        closeIcon={<span style={{ color: 'red' }}>✕</span>}
      >
        {!isHiddenSearch && (
          <div style={{ marginBottom: 16 }}>
            <ButtonInputSearch
              size="middle"
              placeholder="Tìm kiếm sản phẩm"
              textbutton="Search"
              allowClear
              onChange={onSearch}
              style={{ border: 'none' }}
            />
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ cursor: 'pointer', color: '#ffffff' }} onClick={() => { navigate('/'); setIsMenuOpen(false); }}>
            <HomeOutlined style={{ color: '#d29b63' }} /> <span style={{ marginLeft: 8 }}>Trang chủ</span>
          </div>
          <div style={{ cursor: 'pointer', color: '#ffffff' }} onClick={() => {
            navigate('/my-order', {
              state: {
                id: user?.id,
                access_token: user?.access_token,
              },
            }); setIsMenuOpen(false);
          }}>
            <AppstoreOutlined style={{ color: '#d29b63' }} /> <span style={{ marginLeft: 8 }}>Đơn hàng của tôi</span>
          </div>
          <Divider style={{ margin: '8px 0', borderColor: '#3a3a3a' }} />
          {user?.access_token ? (
            <div style={{ cursor: 'pointer', color: '#ffffff' }} onClick={() => { navigate('/profile-user'); setIsMenuOpen(false); }}>
              <ProfileOutlined style={{ color: '#d29b63' }} /> <span style={{ marginLeft: 8 }}>Tài khoản</span>
            </div>
          ) : (
            <div style={{ cursor: 'pointer', color: '#ffffff' }} onClick={() => { handleNavigateLogin(); setIsMenuOpen(false); }}>
              <LoginOutlined style={{ color: '#d29b63' }} /> <span style={{ marginLeft: 8 }}>Đăng nhập</span>
            </div>
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default HeaderComponent;
