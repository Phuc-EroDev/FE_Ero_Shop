import React, { useEffect, useState } from 'react';
import { Badge, Col, Popover, Drawer, Button } from 'antd';
import {
  WrapperHeader,
  WrapperTextHeader,
  WrapperHeaderAccount,
  WrapperTextHeaderSmall,
  WrapperContentPopup,
} from './style.js';
import { 
  CaretDownOutlined, 
  UserOutlined, 
  ShoppingCartOutlined, 
  MenuOutlined 
} from '@ant-design/icons';
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
  const [drawerVisible, setDrawerVisible] = useState(false);
  // const [search, setSearch] = useState('');

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
    <div>
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
        break;

      case 'home':
        navigate('/');
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
    <div>
      <WrapperHeader style={{ justifyContent: isHiddenSearch && isHiddenCard ? 'space-between' : 'unset' }}>
        {/* Mobile Menu Button - Only visible on small screens */}
        <Col 
          xs={4} sm={4} md={0} lg={0} xl={0} 
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <Button 
            type="text" 
            icon={<MenuOutlined style={{ fontSize: '20px', color: '#FDF6EC' }} />} 
            onClick={() => setDrawerVisible(true)}
            style={{ padding: 0, border: 'none' }}
          />
        </Col>
        
        {/* Logo */}
        <Col xs={16} sm={16} md={5} lg={5} xl={5} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
        
        {/* User Account & Cart - Show simplified version on mobile */}
        <Col xs={4} sm={4} md={6} lg={6} xl={6} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          {/* Hide user account details on mobile */}
          <div className="desktop-only" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <Loading isPending={loading}>
              <WrapperHeaderAccount className="hide-on-mobile">
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
                    <Popover
                      content={content}
                      trigger="click"
                      open={isOpenPopover}
                      onOpenChange={(visible) => setIsOpenPopover(visible)}
                    >
                      <div style={{ cursor: 'pointer' }} className="hide-on-mobile">
                        {userName?.length ? userName : user?.email}
                      </div>
                    </Popover>
                  </>
                ) : (
                  <div onClick={handleNavigateLogin} className="hide-on-mobile">
                    <WrapperTextHeaderSmall>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
                    <div>
                      <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                      <CaretDownOutlined />
                    </div>
                  </div>
                )}
              </WrapperHeaderAccount>
            </Loading>
          </div>
          
          {/* Show only cart icon on mobile */}
          {!isHiddenCard && (
            <div
              onClick={() => navigate('/order')}
              style={{ cursor: 'pointer' }}
              className="show-on-all-devices"
            >
              <Badge count={order?.orderItems?.length} size="small">
                <ShoppingCartOutlined style={{ fontSize: '24px', color: '#FDF6EC' }} />
              </Badge>
            </div>
          )}
        </Col>
      </WrapperHeader>
      
      {/* Mobile Menu Drawer */}
      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={280}
      >
        {drawerContent}
      </Drawer>
      
      {/* Add mobile-specific styles */}
      <style jsx="true">{`
        @media (max-width: 767px) {
          .hide-on-mobile {
            display: none !important;
          }
        }
        
        @media (min-width: 768px) {
          .show-on-mobile {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default HeaderComponent;
