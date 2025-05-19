import React, { useState } from 'react';
import { TextWelcomeShop, WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style';
import InputFormComponent from '../../components/InputFormComponent/InputFormComponent';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const disabled = !email || !password;

  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };

  const handleOnChangePassword = (value) => {
    setPassword(value);
  };

  const handleSignIn = () => {
    console.log('sign In', email, password);
  };

  const navigate = useNavigate();
  const handleNavigateSignUp = () => {
    navigate('/sign-up');
  };

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
          <InputFormComponent
            value={email}
            handleOnChange={handleOnChangeEmail}
            placeholder="abc@email.com"
            style={{ marginBottom: '10px' }}
          />
          <div style={{ position: 'relative' }}>
            <span
              style={{
                zIndex: 10,
                position: 'absolute',
                color: '#655e5e',
                top: '6px',
                left: '386px',
                fontSize: '14px',
              }}
              onClick={() => setIsShowPassword(!isShowPassword)}
            >
              {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <InputFormComponent
              value={password}
              handleOnChange={handleOnChangePassword}
              placeholder="Mật khẩu"
              type={isShowPassword ? 'text' : 'password'}
            />
          </div>
          <ButtonComponent
            onClick={handleSignIn}
            disabled={!email.length || !password.length}
            size={'large'}
            style={{
              backgroundColor: disabled ? '#ccc' : '#C68642',
              borderRadius: '4px',
              color: '#FDF6EC',
              fontWeight: '600',
              width: '100%',
              margin: '26px 0 10px',
            }}
            textButton={'Đăng nhập'}
          />
          <WrapperTextLight>Quên mật khẩu?</WrapperTextLight>
          <p>
            Chưa có tài khoản? <WrapperTextLight onClick={handleNavigateSignUp}> Tạo tài khoản!</WrapperTextLight>
          </p>
        </WrapperContainerLeft>

        <WrapperContainerRight>
          <TextWelcomeShop>Mua sắm tại Ero_Shop</TextWelcomeShop>
        </WrapperContainerRight>
      </div>
    </div>
  );
};

export default SignInPage;
