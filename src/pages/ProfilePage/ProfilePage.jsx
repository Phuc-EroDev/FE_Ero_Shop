import React, { useEffect, useState } from 'react';
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel } from './style';
import InputFormComponent from '../../components/InputFormComponent/InputFormComponent';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import * as UserService from '../../services/UserService';
import * as message from '../../components/MessageComponent/Message';
import { useDispatch, useSelector } from 'react-redux';
import { useMutationHook } from '../../hooks/useMutationHook';
import Loading from '../../components/LoadingComponent/Loading';
import { updateUser } from '../../redux/slides/userSlide';

const ProfilePage = () => {
  const user = useSelector((state) => state.user);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [avatar, setAvatar] = useState('');

  const dispatch = useDispatch();

  const mutation = useMutationHook((id, data) => UserService.updateUser(id, data));
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
  const handleOnChangeAvatar = (value) => {
    setAvatar(value);
  };
  const handleUpdate = () => {
    mutation.mutate(user?.id, { email, name, phone, address, avatar });
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
    <div style={{ width: '100%', height: '1500px', margin: '0 auto', padding: '0 120px', backgroundColor: ' #333131' }}>
      <WrapperHeader>Thông tin người dùng</WrapperHeader>
      <Loading isPending={isPending}>
        <WrapperContentProfile>
          <WrapperInput>
            <WrapperLabel htmlFor="name">Name</WrapperLabel>
            <InputFormComponent id="name" style={{ width: '300px' }} value={name} handleOnChange={handleOnChangeName} />
            <ButtonComponent
              onClick={handleUpdate}
              size={'large'}
              style={{
                backgroundColor: '#C68642',
                borderRadius: '4px',
                color: '#FDF6EC',
                fontWeight: '600',
                width: 'fit-content',
                height: '30px',
                padding: '4px 6px',
              }}
              textButton={'Cập nhật'}
            />
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor="email">Email</WrapperLabel>
            <InputFormComponent
              id="email"
              style={{ width: '300px' }}
              value={email}
              handleOnChange={handleOnChangeEmail}
            />
            <ButtonComponent
              onClick={handleUpdate}
              size={'large'}
              style={{
                backgroundColor: '#C68642',
                borderRadius: '4px',
                color: '#FDF6EC',
                fontWeight: '600',
                width: 'fit-content',
                height: '30px',
                padding: '4px 6px',
              }}
              textButton={'Cập nhật'}
            />
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor="phone">Phone</WrapperLabel>
            <InputFormComponent
              id="phone"
              style={{ width: '300px' }}
              value={phone}
              handleOnChange={handleOnChangePhone}
            />
            <ButtonComponent
              onClick={handleUpdate}
              size={'large'}
              style={{
                backgroundColor: '#C68642',
                borderRadius: '4px',
                color: '#FDF6EC',
                fontWeight: '600',
                width: 'fit-content',
                height: '30px',
                padding: '4px 6px',
              }}
              textButton={'Cập nhật'}
            />
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor="address">Address</WrapperLabel>
            <InputFormComponent
              id="address"
              style={{ width: '300px' }}
              value={address}
              handleOnChange={handleOnChangeAddress}
            />
            <ButtonComponent
              onClick={handleUpdate}
              size={'large'}
              style={{
                backgroundColor: '#C68642',
                borderRadius: '4px',
                color: '#FDF6EC',
                fontWeight: '600',
                width: 'fit-content',
                height: '30px',
                padding: '4px 6px',
              }}
              textButton={'Cập nhật'}
            />
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor="avatar">Avatar</WrapperLabel>
            <InputFormComponent
              id="avatar"
              style={{ width: '300px' }}
              value={avatar}
              handleOnChange={handleOnChangeAvatar}
            />
            <ButtonComponent
              onClick={handleUpdate}
              size={'large'}
              style={{
                backgroundColor: '#C68642',
                borderRadius: '4px',
                color: '#FDF6EC',
                fontWeight: '600',
                width: 'fit-content',
                height: '30px',
                padding: '4px 6px',
              }}
              textButton={'Cập nhật'}
            />
          </WrapperInput>
        </WrapperContentProfile>
      </Loading>
    </div>
  );
};

export default ProfilePage;
