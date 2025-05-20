import React, { useEffect, useState } from 'react';
import { TextWelcomeShop, WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style';
import InputFormComponent from '../../components/InputFormComponent/InputFormComponent';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import * as UserService from '../../services/UserService';
import { useMutationHook } from '../../hooks/useMutationHook';
import Loading from '../../components/LoadingComponent/Loading';
import * as message from '../../components/MessageComponent/Message';

const SignUpPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const disabled = !email || !password || !confirmPassword;

  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };

  const handleOnChangePassword = (value) => {
    setPassword(value);
  };

  const handleOnChangeConfirmPassword = (value) => {
    setConfirmPassword(value);
  };

  const navigate = useNavigate();
  const handleNavigateLogin = () => {
    navigate('/sign-in');
  };

  const mutation = useMutationHook((data) => UserService.registerUser(data));
  const { data, isPending, isSuccess, isError } = mutation;

  useEffect(() => {
    if (isSuccess) {
      message.success();
      handleNavigateLogin();
    } else if (isError) {
      message.error();
    }
  }, [isSuccess, isError]);

  const handleSignUp = () => {
    mutation.mutate({
      email,
      password,
      confirmPassword,
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
          <div style={{ position: 'relative', marginBottom: '10px' }}>
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
              onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
            >
              {isShowConfirmPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <InputFormComponent
              value={confirmPassword}
              handleOnChange={handleOnChangeConfirmPassword}
              placeholder="Nhập lại mật khẩu"
              type={isShowConfirmPassword ? 'text' : 'password'}
            />
          </div>
          {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
          <Loading isPending={isPending}>
            <ButtonComponent
              onClick={handleSignUp}
              disabled={!email.length || !password.length || !confirmPassword}
              size={'large'}
              style={{
                backgroundColor: disabled ? '#ccc' : '#C68642',
                borderRadius: '4px',
                color: '#FDF6EC',
                fontWeight: '600',
                width: '100%',
                margin: '26px 0 10px',
              }}
              textButton={'Đăng ký'}
            />
          </Loading>
          <p>
            Bạn đã có tài khoản? <WrapperTextLight onClick={handleNavigateLogin}> Đăng nhập!</WrapperTextLight>
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
