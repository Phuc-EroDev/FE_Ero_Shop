import React, { useEffect, useMemo, useState } from 'react';
import { Form, Radio } from 'antd';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import {
  WrapperAddressInfo,
  WrapperInfo,
  WrapperLeft,
  WrapperMethodSection,
  WrapperRight,
  WrapperTotal,
} from './style';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/slides/userSlide';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import Loading from '../../components/LoadingComponent/Loading';
import InputComponent from '../../components/InputComponent/InputComponent';
import { useMutationHook } from '../../hooks/useMutationHook';
import * as UserService from '../../services/UserService';
import * as OrderService from '../../services/OrderService';
import * as message from '../../components/MessageComponent/Message';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
  const [listChecked, setListChecked] = useState([]);
  const [payment, setPayment] = useState('cod'); // Default payment method
  const [shipping, setShipping] = useState('fast'); // Default shipping method
  const [stateUserDetails, setStateUserDetails] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
  });

  const navigate = useNavigate();
  const [form] = Form.useForm();

  const order = useSelector((state) => state?.order);
  const user = useSelector((state) => state?.user);

  const mutationUpdate = useMutationHook((data) => {
    const { _id, access_token, ...rests } = data;
    const newData = rests.stateUserDetails;
    return UserService.updateUser(_id, newData, access_token);
  });

  const mutationAddOrder = useMutationHook((data) => {
    const { access_token, ...rests } = data;
    return OrderService.createOrder(rests, access_token);
  });

  const dispatch = useDispatch();

  const handleChangeAddress = () => {
    setIsOpenModalUpdateInfo(true);
  };

  const subtotalMemo = useMemo(() => {
    const result = order?.orderItemsSelected?.reduce((subtotal, ItemSelected) => {
      return subtotal + ((ItemSelected?.price * 100) / (100 - ItemSelected?.discount)) * ItemSelected?.amount;
    }, 0);
    return result;
  }, [order?.orderItemsSelected]);

  const subtotalAfterDiscountMemo = useMemo(() => {
    const result = order?.orderItemsSelected?.reduce((subtotalAfterDiscount, ItemSelected) => {
      return subtotalAfterDiscount + ItemSelected?.price * ItemSelected?.amount;
    }, 0);
    return result;
  }, [order?.orderItemsSelected]);

  const shippingFeeMemo = useMemo(() => {
    const subtotal = subtotalMemo;
    if (subtotal <= 10000) {
      return 0;
    } else if (subtotal > 10000 && subtotal <= 100000) {
      return 10000;
    } else if (subtotal > 100000) {
      return 50000;
    }
    return 20000;
  }, [subtotalMemo]);

  const totalPriceMemo = useMemo(() => {
    const tax = 0; // Giả sử không có thuế
    const result = subtotalAfterDiscountMemo + shippingFeeMemo + tax;
    return result;
  }, [subtotalAfterDiscountMemo, shippingFeeMemo]);

  const handleAddOrder = () => {
    if (
      user?.access_token &&
      order?.orderItemsSelected &&
      user?.name &&
      user?.address &&
      user?.city &&
      user?.phone &&
      subtotalMemo &&
      shippingFeeMemo &&
      totalPriceMemo &&
      payment &&
      user?.id
    ) {
      mutationAddOrder.mutate({
        orderItems: order?.orderItemsSelected,
        fullName: user?.name,
        address: user?.address,
        city: user?.city,
        phone: user?.phone,
        access_token: user?.access_token,
        paymentMethod: payment,
        itemsPrice: subtotalMemo,
        shippingPrice: shippingFeeMemo,
        totalPrice: totalPriceMemo,
        user: user?.id,
      });
    }
  };

  const handleCancelModalUpdateInfo = () => {
    setStateUserDetails({
      name: '',
      phone: '',
      address: '',
      city: '',
    });
    setIsOpenModalUpdateInfo(false);
  };

  const handleUpdateInfoUser = () => {
    const { name, phone, address, city } = stateUserDetails;
    if (name && phone && address && city) {
      mutationUpdate.mutate(
        { _id: user?.id, stateUserDetails, access_token: user?.access_token },
        {
          onSuccess: () => {
            dispatch(updateUser({ name, phone, address, city }));
            setIsOpenModalUpdateInfo(false);
          },
        },
      );
    }
  };

  const { data, isPending } = mutationUpdate;
  const {
    data: dataAddOrder,
    isPending: isPendingAddOrder,
    isSuccess: isSuccessAddOrder,
    isError: isErrorAddOrder,
  } = mutationAddOrder;

  const handleOnChangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (isOpenModalUpdateInfo) {
      setStateUserDetails({
        ...stateUserDetails,
        name: user?.name,
        phone: user?.phone,
        address: user?.address,
        city: user?.city,
      });
    }
  }, [isOpenModalUpdateInfo]);

  useEffect(() => {
    form.setFieldsValue(stateUserDetails);
  }, [stateUserDetails, form]);

  useEffect(() => {
    if (isSuccessAddOrder && dataAddOrder.status === 'OK') {
      message.success('Đặt hàng thành công');
      alert('Đặt hàng thành công');
      navigate('/order-success', {
        state: { shipping, payment, orders: order?.orderItemsSelected, totalPrice: totalPriceMemo },
      });
    } else if (isErrorAddOrder) {
      message.error('Đặt hàng thất bại');
    }
  }, [isSuccessAddOrder, isErrorAddOrder]);

  return (
    <div style={{ backgroundColor: '#1a1a1a', width: '100%', minHeight: '100vh', padding: '40px 120px' }}>
      <Loading isPending={isPendingAddOrder}>
        <div>
          <h3 style={{ color: '#ffffff', fontSize: '28px', marginBottom: '10px', textAlign: 'left' }}>Thanh toán:</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
            <WrapperLeft>
              <WrapperMethodSection>
                <h4 className="method-title">Chọn phương thức giao hàng</h4>
                <div className="method-container">
                  <Radio.Group defaultValue="fast" value={shipping} onChange={(e) => setShipping(e.target.value)}>
                    <Radio value="fast">
                      <div className="method-badge">
                        <span className="badge fast">FAST</span>
                        <span>Giao hàng tiết kiệm</span>
                      </div>
                    </Radio>
                    <Radio value="gojek">
                      <div className="method-badge">
                        <span className="badge standard">GO JEK</span>
                        <span>Giao hàng tiết kiệm</span>
                      </div>
                    </Radio>
                  </Radio.Group>
                </div>
              </WrapperMethodSection>

              <WrapperMethodSection>
                <h4 className="method-title">Chọn phương thức thanh toán</h4>
                <div className="method-container">
                  <Radio.Group defaultValue="cod" value={payment} onChange={(e) => setPayment(e.target.value)}>
                    <Radio value="cod">Thanh toán tiền mặt khi nhận hàng</Radio>
                  </Radio.Group>
                </div>
              </WrapperMethodSection>
            </WrapperLeft>

            <WrapperRight>
              <WrapperInfo>
                <WrapperAddressInfo>
                  <div className="address-container">
                    <span className="address-label">Địa chỉ giao hàng:</span>
                    <span className="change-button" onClick={handleChangeAddress}>
                      Thay đổi
                    </span>
                  </div>
                  <div className="address-preview">
                    {user?.address && user?.city
                      ? `${user.address} - ${user.city}`
                      : 'Nhấn "Thay đổi" để thêm địa chỉ giao hàng'}
                  </div>
                </WrapperAddressInfo>
              </WrapperInfo>
              <WrapperInfo>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Tạm tính:</span>
                  <span>{Math.round(subtotalMemo).toLocaleString() || 0}đ</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Giảm giá:</span>
                  <span>{Math.round(subtotalMemo - subtotalAfterDiscountMemo).toLocaleString() || 0}đ</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Thuế:</span>
                  <span>0đ</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Phí giao hàng:</span>
                  <span>{Math.round(shippingFeeMemo).toLocaleString() || 0}đ</span>
                </div>
              </WrapperInfo>

              <WrapperTotal>
                <span>Tổng tiền:</span>
                <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <span>{Math.round(totalPriceMemo).toLocaleString() || 0}đ</span>
                  <span>(Đã bao gồm VAT nếu có)</span>
                </span>
              </WrapperTotal>

              <ButtonComponent
                onClick={() => handleAddOrder()}
                size={40}
                style={{
                  backgroundColor: '#D29B63',
                  height: '48px',
                  width: '100%',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontSize: '16px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                }}
                textbutton={'Đặt hàng'}
              />
            </WrapperRight>
          </div>
        </div>
        <ModalComponent
          forceRender
          title="Cập nhật thông tin giao hàng"
          open={isOpenModalUpdateInfo}
          onCancel={handleCancelModalUpdateInfo}
          onOk={handleUpdateInfoUser}
        >
          <Loading isPending={isPending}>
            <Form
              name="basic"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              // onFinish={onUpdateUser}
              autoComplete="on"
              form={form}
            >
              <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your Name!' }]}>
                <InputComponent value={stateUserDetails.name} onChange={handleOnChangeDetails} name="name" />
              </Form.Item>

              <Form.Item label="Phone" name="phone" rules={[{ required: true, message: 'Please input your Phone!' }]}>
                <InputComponent value={stateUserDetails.phone} onChange={handleOnChangeDetails} name="phone" />
              </Form.Item>

              <Form.Item
                label="Address"
                name="address"
                rules={[{ required: true, message: 'Please input your Address!' }]}
              >
                <InputComponent value={stateUserDetails.address} onChange={handleOnChangeDetails} name="address" />
              </Form.Item>

              <Form.Item label="City" name="city" rules={[{ required: true, message: 'Please input your City!' }]}>
                <InputComponent value={stateUserDetails.city} onChange={handleOnChangeDetails} name="city" />
              </Form.Item>
            </Form>
          </Loading>
        </ModalComponent>
      </Loading>
    </div>
  );
};

export default PaymentPage;
