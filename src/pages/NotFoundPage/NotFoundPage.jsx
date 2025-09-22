import React from 'react';
import { Result, Typography, Space } from 'antd';
import { Link } from 'react-router-dom';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { HomeOutlined, LoginOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import notFoundImage from '../../assets/images/notFound.png';

const { Title, Text } = Typography;

const NotFoundWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, #1a1a1a, #121212);
  padding: 20px;
`;

const NotFoundContainer = styled.div`
  max-width: 800px;
  width: 100%;
  text-align: center;
  background-color: #222222;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  padding: 40px 20px;

  @media (max-width: 576px) {
    padding: 30px 15px;
  }
`;

const StyledImage = styled.img`
  max-width: 300px;
  width: 100%;
  filter: brightness(0.9) contrast(1.1);
  border-radius: 10px;

  @media (max-width: 576px) {
    max-width: 220px;
  }
`;

const ButtonsWrapper = styled(Space)`
  margin-top: 30px;
  
  @media (max-width: 576px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    width: 100%;
  }
`;

const ResponsiveTitle = styled(Title)`
  font-size: 4rem !important;
  color: #ff6b6b !important;
  margin: 0 !important;

  @media (max-width: 576px) {
    font-size: 3.5rem !important;
  }

  @media (max-width: 400px) {
    font-size: 3rem !important;
  }
`;

const NotFoundPage = () => {
  return (
    <NotFoundWrapper>
      <NotFoundContainer>
        <div style={{ marginTop: '30px' }}>
          <StyledImage
            src={notFoundImage}
            alt="404 illustration"
          />
        </div>
        <ResponsiveTitle>404</ResponsiveTitle>
        <Space direction="vertical" size="large">
          <Title level={3} style={{ marginTop: '10px', fontWeight: 500, color: '#e1e1e1' }}>
            Oops! Trang không tìm thấy
          </Title>
          <Text style={{ fontSize: '16px', color: '#a0a0a0', maxWidth: '500px', margin: '0 auto' }}>
            Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
            Vui lòng kiểm tra URL hoặc quay lại trang chủ.
          </Text>
        </Space>
        <ButtonsWrapper>
          <ButtonComponent
            textbutton="Quay lại trang chủ"
            size="large"
            icon={<HomeOutlined />}
            style={{
              background: '#ff6b6b',
              borderColor: '#ff6b6b',
              color: '#ffffff',
              fontWeight: 'bold',
              padding: '0 25px',
              height: '48px',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(255, 107, 107, 0.3)',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={() => window.location.href = '/'}
          />
          <Link to="/sign-in" style={{ width: '100%' }}>
            <ButtonComponent
              textbutton="Đi đến đăng nhập"
              size="large"
              icon={<LoginOutlined />}
              style={{
                background: '#333333',
                borderColor: '#ff6b6b',
                color: '#ff6b6b',
                fontWeight: 'bold',
                padding: '0 25px',
                height: '48px',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            />
          </Link>
        </ButtonsWrapper>
      </NotFoundContainer>
    </NotFoundWrapper>
  );
};

export default NotFoundPage;
