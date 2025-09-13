import React, { useEffect, useState } from 'react';
import {
  WrapperContainer,
  WrapperContentProfile,
  WrapperHeader,
  WrapperInput,
  WrapperLabel,
  WrapperUploadFile,
  AvatarContainer,
  AvatarPreview,
  UpdateButtonContainer,
  InputStyle
} from './style';
import InputFormComponent from '../../components/InputFormComponent/InputFormComponent';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import * as UserService from '../../services/UserService';
import * as message from '../../components/MessageComponent/Message';
import { useDispatch, useSelector } from 'react-redux';
import { useMutationHook } from '../../hooks/useMutationHook';
import Loading from '../../components/LoadingComponent/Loading';
import { updateUser } from '../../redux/slides/userSlide';
import { Button } from 'antd';
import { UploadOutlined, UserOutlined, MailOutlined, PhoneOutlined, HomeOutlined } from '@ant-design/icons';
import { getBase64 } from '../../utils';

const ProfilePage = () => {
  const user = useSelector((state) => state?.user);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [avatar, setAvatar] = useState('');

  const dispatch = useDispatch();

  const mutation = useMutationHook((data) => {
    const { id, access_token, ...rests } = data;
    return UserService.updateUser(id, rests, access_token);
  });
  const { data, isPending, isSuccess, isError } = mutation;

  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnChangeName = (value) => {
    setName(value);
  };
  const handleOnChangePhone = (value) => {
    setPhone(value);
  };
  const handleOnChangeAddress = (value) => {
    setAddress(value);
  };
  const handleOnChangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setAvatar(file.preview);
  };
  const handleUpdate = () => {
    mutation.mutate({ id: user?.id, email, name, phone, address, avatar, access_token: user?.access_token });
  };

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  useEffect(() => {
    setEmail(user?.email);
    setName(user?.name);
    setPhone(user?.phone);
    setAddress(user?.address);
    setAvatar(user?.avatar);
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      message.success();
      handleGetDetailsUser(user?.id, user?.access_token);
    } else if (isError) {
      message.error();
    }
  }, [isSuccess, isError]);

  return (
    <WrapperContainer>
      <WrapperHeader>Thông tin người dùng</WrapperHeader>
      <Loading isPending={isPending}>
        <WrapperContentProfile>
          <WrapperInput>
            <WrapperLabel htmlFor="name">Name</WrapperLabel>
            <InputFormComponent
              id="name"
              style={InputStyle}
              value={name}
              handleOnChange={handleOnChangeName}
              placeholder="Nhập tên của bạn"
              prefix={<UserOutlined style={{ color: '#C68642' }} />}
            />
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor="email">Email</WrapperLabel>
            <InputFormComponent
              id="email"
              style={InputStyle}
              value={email}
              handleOnChange={handleOnChangeEmail}
              placeholder="Nhập email của bạn"
              prefix={<MailOutlined style={{ color: '#C68642' }} />}
            />
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor="phone">Phone</WrapperLabel>
            <InputFormComponent
              id="phone"
              style={InputStyle}
              value={phone}
              handleOnChange={handleOnChangePhone}
              placeholder="Nhập số điện thoại"
              prefix={<PhoneOutlined style={{ color: '#C68642' }} />}
            />
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor="address">Address</WrapperLabel>
            <InputFormComponent
              id="address"
              style={InputStyle}
              value={address}
              handleOnChange={handleOnChangeAddress}
              placeholder="Nhập địa chỉ của bạn"
              prefix={<HomeOutlined style={{ color: '#C68642' }} />}
            />
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor="avatar">Avatar</WrapperLabel>
            <AvatarContainer>
              <WrapperUploadFile onChange={handleOnChangeAvatar} maxCount={1}>
                <Button icon={<UploadOutlined />}>Select File</Button>
              </WrapperUploadFile>
              {avatar && (
                <AvatarPreview
                  src={avatar}
                  alt="Avatar"
                />
              )}
            </AvatarContainer>
          </WrapperInput>
          <UpdateButtonContainer>
            <ButtonComponent
              onClick={handleUpdate}
              size={'middle'}
              textbutton={'Cập nhật'}
            />
          </UpdateButtonContainer>
        </WrapperContentProfile>
      </Loading>
    </WrapperContainer>
  );
};

export default ProfilePage;
