import React, { useEffect, useState } from 'react';
import { TextWelcomeShop, WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style';
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
          height: '500px',
          borderRadius: '6px',
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: '#333131',
        }}
      >
        <WrapperContainerLeft>
          <h1>Quên mật khẩu</h1>
          <p>Nhập thông tin để đặt lại mật khẩu</p>

          <div style={{ position: 'relative' }}>
            <span
              style={{
                zIndex: 10,
                position: 'absolute',
                color: '#C68642',
                top: '1px',
                right: '10px',
                fontSize: '12px',
                cursor: 'pointer',
                padding: '6px 8px',
                backgroundColor: '#fff',
                borderLeft: '1px solid #C68642',
              }}
              onClick={sendOtp}
            >
              Nhận OTP
            </span>
            <InputFormComponent
              value={email}
              handleOnChange={handleOnChangeEmail}
              placeholder="Nhập email của bạn"
              style={{ marginBottom: '10px' }}
            />
          </div>

          <div style={{ position: 'relative', marginBottom: '10px' }}>
            <span
              style={{
                zIndex: 10,
                position: 'absolute',
                color: '#655e5e',
                top: '6px',
                right: '10px',
                fontSize: '14px',
                cursor: 'pointer',
              }}
              onClick={() => setIsShowNewPassword(!isShowNewPassword)}
            >
              {isShowNewPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <InputFormComponent
              value={newPassword}
              handleOnChange={handleOnChangeNewPassword}
              placeholder="Mật khẩu mới"
              type={isShowNewPassword ? 'text' : 'password'}
            />
          </div>

          <div style={{ position: 'relative', marginBottom: '10px' }}>
            <span
              style={{
                zIndex: 10,
                position: 'absolute',
                color: '#655e5e',
                top: '6px',
                right: '10px',
                fontSize: '14px',
                cursor: 'pointer',
              }}
              onClick={() => setIsShowConfirmNewPassword(!isShowConfirmNewPassword)}
            >
              {isShowConfirmNewPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <InputFormComponent
              value={confirmNewPassword}
              handleOnChange={handleOnChangeConfirmNewPassword}
              placeholder="Nhập lại mật khẩu mới"
              type={isShowConfirmNewPassword ? 'text' : 'password'}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <InputFormComponent
              style={{ width: '80%' }}
              value={otp}
              handleOnChange={handleOnChangeOTP}
              placeholder="Nhập OTP"
              type="text"
            />
            {isSentOtp && (
              <span
                style={{
                  width: '100%',
                  marginLeft: '15px',
                  fontSize: '12px',
                  color: '#C68642',
                }}
              >
                Đã gửi thành công OTP!
              </span>
            )}
          </div>

          {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}

          <Loading isPending={isPending}>
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
                margin: '26px 0 10px',
              }}
              textbutton={'Xác nhận đặt lại mật khẩu'}
            />
          </Loading>

          <p>
            Nhớ mật khẩu? <WrapperTextLight onClick={handleNavigateLogin}>Đăng nhập!</WrapperTextLight>
          </p>
        </WrapperContainerLeft>

        <WrapperContainerRight>
          <TextWelcomeShop>Mua sắm tại Ero_Shop</TextWelcomeShop>
        </WrapperContainerRight>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
