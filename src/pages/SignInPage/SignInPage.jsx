import React, { useEffect, useState } from 'react';
import { TextWelcomeShop, WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style';
import InputFormComponent from '../../components/InputFormComponent/InputFormComponent';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { EyeFilled, EyeInvisibleFilled, LeftOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import * as UserService from '../../services/UserService';
import { useMutationHook } from '../../hooks/useMutationHook';
import Loading from '../../components/LoadingComponent/Loading';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/slides/userSlide';
import * as message from '../../components/MessageComponent/Message';

const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const location = useLocation();

  const disabled = !email || !password;

  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };

  const handleOnChangePassword = (value) => {
    setPassword(value);
  };

  const navigate = useNavigate();
  const handleNavigateSignUp = () => {
    navigate('/sign-up');
  };

  const handleNavigateForgotPassword = () => {
    navigate('/forgot-password');
  };

  const handleNavigateHome = () => {
    navigate('/');
  };

  const mutation = useMutationHook((data) => UserService.loginUser(data));
  const { data, isPending, isSuccess, isError } = mutation;

  useEffect(() => {
    if (isSuccess && data?.status === 'OK') {
      localStorage.setItem('access_token', JSON.stringify(data?.access_token));
      localStorage.setItem('refresh_token', JSON.stringify(data?.refresh_token));
      if (data?.access_token) {
        const decoded = jwtDecode(data?.access_token);
        if (decoded?.id) {
          handleGetDetailsUser(decoded?.id, data?.access_token);
        }
      }
      if (location?.state) {
        navigate(location.state);
      } else {
        navigate('/');
      }
    } else if (isSuccess && data?.status === 'ERR') {
      message.error('Đăng nhập thất bại');
    } else if (isError) {
      message.error('Đăng nhập thất bại');
    }
  }, [isSuccess, isError, data]);

  const handleGetDetailsUser = async (id, token) => {
    const storage = localStorage.getItem('refresh_token');
    const refresh_token = storage ? JSON.parse(storage) : null;
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token, refresh_token }));
  };

  const handleSignIn = () => {
    mutation.mutate({
      email,
      password,
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.53)',
        height: '100vh',
        position: 'relative',
      }}
    >
      <div
        onClick={handleNavigateHome}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: '#C68642',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500',
          transition: 'all 0.3s ease',
          zIndex: 10,
        }}
        onMouseEnter={(e) => {
          e.target.style.color = '#D4A574';
        }}
        onMouseLeave={(e) => {
          e.target.style.color = '#C68642';
        }}
      >
        <LeftOutlined style={{ fontSize: '16px' }} />
        <span>Return Home</span>
      </div>

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
          <p>Đăng nhập tài khoản của bạn</p>
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
          {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
          <Loading isPending={isPending}>
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
              textbutton={'Đăng nhập'}
            />
          </Loading>
          <WrapperTextLight onClick={handleNavigateForgotPassword}>Quên mật khẩu?</WrapperTextLight>
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
