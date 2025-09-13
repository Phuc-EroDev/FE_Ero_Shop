import React, { useEffect, useState } from 'react';
import {
  TextWelcomeShop,
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperTextLight,
  MainContainer,
  ReturnHomeButton,
  ForgotPasswordContainer,
  PasswordWrapper,
  PasswordIcon,
  EmailWrapper,
  OtpButton,
  OtpWrapper,
  OtpSuccessMessage,
  ButtonWrapper
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

const ForgotPasswordPage = () => {
  const [isShowNewPassword, setIsShowNewPassword] = useState(false);
  const [isShowConfirmNewPassword, setIsShowConfirmNewPassword] = useState(false);
  const [isSentOtp, setIsSentOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const disabled = !email || !newPassword || !confirmNewPassword || !otp;

  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };

  const handleOnChangeNewPassword = (value) => {
    setNewPassword(value);
  };

  const handleOnChangeConfirmNewPassword = (value) => {
    setConfirmNewPassword(value);
  };

  const handleOnChangeOTP = (value) => {
    setOtp(value);
  };

  const sendOtp = () => {
    if (!email) {
      warning('Vui lòng nhập email trước khi lấy OTP');
      return;
    }
    OtpService.sendOtp(email);
    setIsSentOtp(true);
    success('Đã gửi OTP đến email của bạn!');
  };

  const navigate = useNavigate();
  const handleNavigateLogin = () => {
    navigate('/sign-in');
  };

  const handleNavigateHome = () => {
    navigate('/');
  };

  // Tạo mutation cho reset password (cần tạo service này)
  const mutation = useMutationHook((data) => {
    // Sẽ cần tạo service resetPassword trong UserService
    return UserService.resetPassword(data);
  });

  const { data, isPending, isSuccess, isError } = mutation;

  useEffect(() => {
    if (isSuccess) {
      success('Đặt lại mật khẩu thành công!');
      handleNavigateLogin();
    } else if (isError) {
      error('Đặt lại mật khẩu thất bại!');
    }
  }, [isSuccess, isError]);

  const handleResetPassword = () => {
    if (newPassword !== confirmNewPassword) {
      warning('Mật khẩu xác nhận không khớp!');
      return;
    }

    mutation.mutate({
      email,
      newPassword,
      confirmNewPassword,
      otp,
    });
  };

  return (
    <MainContainer>
      <ReturnHomeButton onClick={handleNavigateHome}>
        <LeftOutlined style={{ fontSize: '16px' }} />
        <span>Return Home</span>
      </ReturnHomeButton>

      <ForgotPasswordContainer>
        <WrapperContainerLeft>
          <h1>Quên mật khẩu</h1>
          <p>Nhập thông tin để đặt lại mật khẩu</p>

          <EmailWrapper>
            <OtpButton onClick={sendOtp}>
              Nhận OTP
            </OtpButton>
            <InputFormComponent
              value={email}
              handleOnChange={handleOnChangeEmail}
              placeholder="Nhập email của bạn"
            />
          </EmailWrapper>

          <PasswordWrapper>
            <PasswordIcon onClick={() => setIsShowNewPassword(!isShowNewPassword)}>
              {isShowNewPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </PasswordIcon>
            <InputFormComponent
              value={newPassword}
              handleOnChange={handleOnChangeNewPassword}
              placeholder="Mật khẩu mới"
              type={isShowNewPassword ? 'text' : 'password'}
            />
          </PasswordWrapper>

          <PasswordWrapper>
            <PasswordIcon onClick={() => setIsShowConfirmNewPassword(!isShowConfirmNewPassword)}>
              {isShowConfirmNewPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </PasswordIcon>
            <InputFormComponent
              value={confirmNewPassword}
              handleOnChange={handleOnChangeConfirmNewPassword}
              placeholder="Nhập lại mật khẩu mới"
              type={isShowConfirmNewPassword ? 'text' : 'password'}
            />
          </PasswordWrapper>

          <OtpWrapper>
            <InputFormComponent
              style={{ width: '80%' }}
              value={otp}
              handleOnChange={handleOnChangeOTP}
              placeholder="Nhập OTP"
              type="text"
            />
            {isSentOtp && (
              <OtpSuccessMessage>
                Đã gửi thành công OTP!
              </OtpSuccessMessage>
            )}
          </OtpWrapper>

          {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}

          <Loading isPending={isPending}>
            <ButtonWrapper>
              <ButtonComponent
                onClick={handleResetPassword}
                disabled={disabled}
                size={'large'}
                style={{
                  backgroundColor: disabled ? '#ccc' : '#C68642',
                  borderRadius: '4px',
                  color: '#FDF6EC',
                  fontWeight: '600',
                  width: '100%',
                }}
                textbutton={'Xác nhận đặt lại mật khẩu'}
              />
            </ButtonWrapper>
          </Loading>

          <p>
            Nhớ mật khẩu? <WrapperTextLight onClick={handleNavigateLogin}>Đăng nhập!</WrapperTextLight>
          </p>
        </WrapperContainerLeft>

        <WrapperContainerRight>
          <TextWelcomeShop>Mua sắm tại Ero_Shop</TextWelcomeShop>
        </WrapperContainerRight>
      </ForgotPasswordContainer>
    </MainContainer>
  );
};

export default ForgotPasswordPage;
