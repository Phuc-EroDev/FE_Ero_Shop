import React, { useEffect, useState } from 'react';
import {
  TextWelcomeShop,
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperTextLight,
  MainContainer,
  ReturnHomeButton,
  SignUpContainer,
  PasswordWrapper,
  PasswordIcon,
  EmailWrapper,
  OtpButton,
  OtpWrapper,
  OtpSuccessMessage
} from './style';
import InputFormComponent from '../../components/InputFormComponent/InputFormComponent';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { EyeFilled, EyeInvisibleFilled, LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import * as UserService from '../../services/UserService';
import * as OtpService from '../../services/OtpService';
import { useMutationHook } from '../../hooks/useMutationHook';
import Loading from '../../components/LoadingComponent/Loading';
import * as message from '../../components/MessageComponent/Message';
import { success, error, warning } from '../../components/MessageComponent/Message';

const SignUpPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [isSentOtp, setIsSentOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const disabled = !email || !password || !confirmPassword || !otp;

  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };

  const handleOnChangePassword = (value) => {
    setPassword(value);
  };

  const handleOnChangeConfirmPassword = (value) => {
    setConfirmPassword(value);
  };

  const handleOnChangeOTP = (value) => {
    setOtp(value);
  };

  const sendOtp = () => {
    OtpService.sendOtp(email);
    setIsSentOtp(true);
  };

  const navigate = useNavigate();
  const handleNavigateLogin = () => {
    navigate('/sign-in');
  };

  const handleNavigateHome = () => {
    navigate('/');
  };

  const mutation = useMutationHook((data) => UserService.registerUser(data));
  const { data, isPending, isSuccess, isError } = mutation;

  useEffect(() => {
    if (isSuccess) {
      success();
      // message.success();
      handleNavigateLogin();
    } else if (isError) {
      error();
      // message.error();
    }
  }, [isSuccess, isError]);

  const handleSignUp = () => {
    mutation.mutate({
      email,
      password,
      confirmPassword,
      otp,
    });
  };

  return (
    <MainContainer>
      <ReturnHomeButton onClick={handleNavigateHome}>
        <LeftOutlined style={{ fontSize: '16px' }} />
        <span>Return Home</span>
      </ReturnHomeButton>

      <SignUpContainer>
        <WrapperContainerLeft>
          <h1>Xin chào</h1>
          <p>Đăng ký tài khoản của bạn</p>
          <EmailWrapper>
            <OtpButton onClick={sendOtp}>
              Nhận OTP
            </OtpButton>
            <InputFormComponent
              value={email}
              handleOnChange={handleOnChangeEmail}
              placeholder="abc@email.com"
            />
          </EmailWrapper>
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
          <PasswordWrapper>
            <PasswordIcon onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}>
              {isShowConfirmPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </PasswordIcon>
            <InputFormComponent
              value={confirmPassword}
              handleOnChange={handleOnChangeConfirmPassword}
              placeholder="Nhập lại mật khẩu"
              type={isShowConfirmPassword ? 'text' : 'password'}
            />
          </PasswordWrapper>
          <OtpWrapper>
            <InputFormComponent
              style={{ width: '80%', '@media (maxWidth: 768px)': { width: '100%' } }}
              value={otp}
              handleOnChange={handleOnChangeOTP}
              placeholder="Nhập OTP"
              type="text"
            />
            {isSentOtp && (
              <OtpSuccessMessage>
                Đã gửi thành công OTP !
              </OtpSuccessMessage>
            )}
          </OtpWrapper>
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
                margin: '20px 0 10px',
              }}
              textbutton={'Đăng ký'}
            />
          </Loading>
          <p>
            Bạn đã có tài khoản? <WrapperTextLight onClick={handleNavigateLogin}> Đăng nhập!</WrapperTextLight>
          </p>
        </WrapperContainerLeft>

        <WrapperContainerRight>
          <TextWelcomeShop>Mua sắm tại Ero_Shop</TextWelcomeShop>
        </WrapperContainerRight>
      </SignUpContainer>
    </MainContainer>
  );
};

export default SignUpPage;
