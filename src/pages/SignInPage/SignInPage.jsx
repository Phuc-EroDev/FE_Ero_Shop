import React, { useEffect, useState } from 'react';
import { TextWelcomeShop, WrapperContainerLeft, WrapperContainerRight, WrapperTextLight, MainContainer, ReturnHomeButton, LoginContainer, PasswordWrapper, PasswordIcon } from './style';
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
import { useMessage } from '../../context/MessageContext.jsx';

const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const { success, error, warning } = useMessage();

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
      if (data?.access_token) {
        const decoded = jwtDecode(data?.access_token);
        if (decoded?.id) {
          handleGetDetailsUser(decoded?.id, data?.access_token);
        }
      }
      success('Đăng nhập thành công!');
      navigate('/');
    } else if (isError || data?.status === 'ERR') {
      error('Đăng nhập thất bại!');
    }
  }, [isSuccess, isError, data]);

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  const handleSignIn = () => {
    mutation.mutate({
      email,
      password,
    });
  };

  return (
    <MainContainer>
      <ReturnHomeButton onClick={handleNavigateHome}>
        <LeftOutlined style={{ fontSize: '16px' }} />
        <span>Return Home</span>
      </ReturnHomeButton>

      <LoginContainer>
        <WrapperContainerLeft>
          <h1>Xin chào</h1>
          <p>Đăng nhập tài khoản của bạn</p>
          <InputFormComponent
            value={email}
            handleOnChange={handleOnChangeEmail}
            placeholder="abc@email.com"
            style={{ marginBottom: '10px' }}
          />
          <PasswordWrapper>
            <PasswordIcon onClick={() => setIsShowPassword(!isShowPassword)}>
              {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </PasswordIcon>
            <InputFormComponent
              value={password}
              handleOnChange={handleOnChangePassword}
              placeholder="Mật khẩu"
              type={isShowPassword ? 'text' : 'password'}
            />
          </PasswordWrapper>
          {(data?.status === 'ERR' || isError) && (
            <div style={{ color: 'red', margin: '10px 0', fontSize: '14px' }}>
              {data?.message || 'Đăng nhập thất bại!'}
            </div>
          )}
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
                margin: '20px 0 10px',
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
      </LoginContainer>
    </MainContainer>
  );
};

export default SignInPage;
