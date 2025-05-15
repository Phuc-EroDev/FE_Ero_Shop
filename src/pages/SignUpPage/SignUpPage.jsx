import React from 'react';
import { TextWelcomeShop, WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style';
import InputFormComponent from '../../components/InputFormComponent/InputFormComponent';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';

const SignUpPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.53)',
        height: '100vh',
      }}
    >
      <div
        style={{
          width: '800px',
          height: '450px',
          borderRadius: '6px',
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: '#333131',
        }}
      >
        <WrapperContainerLeft>
          <h1>Xin chào</h1>
          <p>Đăng nhập hoặc tạo tài khoản</p>
          <InputFormComponent placeholder="abc@email.com" style={{ marginBottom: '10px' }} />
          <InputFormComponent placeholder="Mật khẩu" style={{ marginBottom: '10px' }} />
          <InputFormComponent placeholder="Nhập lại mật khẩu" />
          <ButtonComponent
            size={'large'}
            style={{
              backgroundColor: '#C68642',
              borderRadius: '4px',
              color: '#FDF6EC',
              fontWeight: '600',
              width: '100%',
              margin: '26px 0 10px',
            }}
            textButton={'Đăng ký'}
          />
          <p>
            Bạn đã có tài khoản? <WrapperTextLight> Đăng nhập!</WrapperTextLight>
          </p>
        </WrapperContainerLeft>

        <WrapperContainerRight>
          <TextWelcomeShop>Mua sắm tại Ero_Shop</TextWelcomeShop>
        </WrapperContainerRight>
      </div>
    </div>
  );
};

export default SignUpPage;
