import React, { useEffect, useMemo, useState, useLayoutEffect } from 'react';
import { Button, Checkbox, Form } from 'antd';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { useResponsive } from '../../hooks/useResponsive';
import {
  WrapperAddressInfo,
  WrapperCountOrder,
  WrapperInfo,
  WrapperItemOrder,
  WrapperLeft,
  WrapperListOrder,
  WrapperPriceDiscount,
  WrapperRight,
  WrapperStyleHeader,
  WrapperStyleHeaderShipping,
  WrapperTotal,
} from './style';
import { WrapperInputNumber } from '../../components/ProductDetailsComponent/style';
import { useDispatch, useSelector } from 'react-redux';
import {
  decreaseAmountOrderProduct,
  increaseAmountOrderProduct,
  removeMultiOrderProduct,
  removeOrderProduct,
  selectedOrder,
} from '../../redux/slides/orderSlide';
import { updateUser } from '../../redux/slides/userSlide';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import Loading from '../../components/LoadingComponent/Loading';
import InputComponent from '../../components/InputComponent/InputComponent';
import { useMutationHook } from '../../hooks/useMutationHook';
import * as UserService from '../../services/UserService';
import * as message from '../../components/MessageComponent/Message';
import { useNavigate } from 'react-router-dom';
import StepsComponent from '../../components/StepsComponent/StepsComponent';

const OrderPage = () => {
  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
  const [listChecked, setListChecked] = useState([]);
  const [stateUserDetails, setStateUserDetails] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
  });
  const { isMobile } = useResponsive();

  const [form] = Form.useForm();

  const navigate = useNavigate();

  const order = useSelector((state) => state?.order);
  const user = useSelector((state) => state?.user);

  const itemShipping = [
    {
      title: 'free shipping',
      description: 'dưới 10.000đ',
    },
    {
      title: '10.000đ shipping fee',
      description: 'Từ 10.000đ --> 100.000đ',
    },
    {
      title: '50.000đ shipping fee',
      description: 'Từ 100.000đ trở lên',
    },
  ];

  const mutationUpdate = useMutationHook((data) => {
    const { _id, access_token, ...rests } = data;
    const newData = rests.stateUserDetails;
    return UserService.updateUser(_id, newData, access_token);
  });

  const dispatch = useDispatch();
  const onChange = (e) => {
    if (listChecked?.includes(e.target.value)) {
      const newListChecked = listChecked?.filter((item) => item !== e.target.value);
      setListChecked(newListChecked);
    } else {
      setListChecked((prev) => [...prev, e.target.value]);
    }
  };

  const handleChangeCount = (idProduct, type, change) => {
    if (type === 'decrease' && change) {
      dispatch(decreaseAmountOrderProduct(idProduct));
    } else if (type === 'increase' && change) {
      dispatch(increaseAmountOrderProduct(idProduct));
    }
  };

  const handleRemoveOrderProduct = (idProduct) => {
    dispatch(removeOrderProduct(idProduct));
  };

  const handleOnChangeCheckAll = (e) => {
    if (e.target.checked) {
      const newListChecked = [];
      order?.orderItems?.forEach((orderItem) => {
        newListChecked.push(orderItem?.product);
      });
      setListChecked(newListChecked);
    } else {
      setListChecked([]);
    }
  };

  const handleRemoveMultiOrderProduct = () => {
    if (listChecked?.length > 0) {
      dispatch(removeMultiOrderProduct(listChecked));
    }
  };

  const handleChangeAddress = () => {
    setIsOpenModalUpdateInfo(true);
  };

  const subtotalMemo = useMemo(() => {
    const result = order?.orderItemsSelected?.reduce((subtotal, ItemSelected) => {
      return subtotal + ItemSelected?.price * ItemSelected?.amount;
    }, 0);
    return Math.round(result);
  }, [order?.orderItemsSelected]);

  const subtotalAfterDiscountMemo = useMemo(() => {
    const result = order?.orderItemsSelected?.reduce((subtotalAfterDiscount, ItemSelected) => {
      return (
        subtotalAfterDiscount +
        (ItemSelected?.price - (ItemSelected?.price * ItemSelected?.discount) / 100) * ItemSelected?.amount
      );
    }, 0);
    return Math.round(result);
  }, [order?.orderItemsSelected]);

  const shippingFeeMemo = useMemo(() => {
    const subtotal = subtotalMemo;
    if (subtotal < 10000) {
      return 0;
    } else if (subtotal >= 10000 && subtotal < 100000) {
      return 10000;
    } else if (subtotal >= 100000) {
      return 50000;
    }
    return 20000;
  }, [subtotalMemo]);

  const totalPriceMemo = useMemo(() => {
    const tax = 0; // Giả sử không có thuế
    const result = subtotalAfterDiscountMemo + shippingFeeMemo + tax;
    return Math.round(result);
  }, [subtotalAfterDiscountMemo, shippingFeeMemo]);

  const handleAddCard = () => {
    if (!order?.orderItemsSelected?.length) {
      message.error('Vui lòng chọn sản phẩm để thanh toán');
    } else if (!user?.name || !user?.email || !user?.phone || !user?.address || !user?.city) {
      setIsOpenModalUpdateInfo(true);
    } else {
      navigate('/payment');
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

  const handleOnChangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    dispatch(selectedOrder(listChecked));
  }, [listChecked]);

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

  return (
    <div style={{
      backgroundColor: '#1a1a1a',
      width: '100%',
      minHeight: '100vh',
      padding: isMobile ? '20px 15px' : '40px 120px',
      marginTop: '-8px'
    }}>
      <div>
        <h3 style={{
          color: '#ffffff',
          fontSize: isMobile ? '22px' : '28px',
          marginBottom: '10px',
          textAlign: 'left'
        }}>Giỏ hàng</h3>
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          gap: '20px'
        }}>
          <WrapperLeft>
            <WrapperStyleHeaderShipping>
              <StepsComponent
                items={itemShipping}
                current={shippingFeeMemo === 0 ? 0 : shippingFeeMemo === 10000 ? 1 : 2}
              />
            </WrapperStyleHeaderShipping>
            <WrapperStyleHeader>
              <span style={{
                display: 'flex',
                alignItems: 'center',
                width: isMobile ? '100%' : '40%'
              }}>
                <Checkbox
                  onChange={handleOnChangeCheckAll}
                  checked={listChecked?.length === order?.orderItems?.length}
                  style={{ marginRight: '12px' }}
                />
                <span>Tất cả ({order?.orderItems?.length} sản phẩm)</span>
              </span>
              <div
                style={{
                  display: isMobile ? 'none' : 'flex',
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingLeft: '20px',
                }}
              >
                <span>Đơn giá</span>
                <span>Số lượng</span>
                <span>Thành tiền</span>
                <DeleteOutlined
                  style={{ cursor: 'pointer', color: '#D29B63', fontSize: '16px' }}
                  onClick={handleRemoveMultiOrderProduct}
                />
              </div>
            </WrapperStyleHeader>

            <WrapperListOrder>
              {order?.orderItems?.map((orderItem) => {
                return (
                  <WrapperItemOrder key={orderItem?.product}>
                    <div style={{
                      width: isMobile ? '100%' : '40%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: isMobile ? '12px' : 0
                    }}>
                      <Checkbox
                        onChange={onChange}
                        checked={listChecked?.includes(orderItem?.product)}
                        value={orderItem?.product}
                      />
                      <img
                        src={orderItem?.image[0].url}
                        alt="product"
                        style={{
                          width: isMobile ? '50px' : '60px',
                          height: isMobile ? '50px' : '60px',
                          objectFit: 'cover',
                          borderRadius: '6px',
                        }}
                      />
                      <div style={{
                        color: '#ffffff',
                        fontSize: isMobile ? '13px' : '14px',
                        fontWeight: '500'
                      }}>{orderItem?.name}</div>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingLeft: isMobile ? '0' : '20px',
                        width: isMobile ? '100%' : 'auto',
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ color: '#D29B63', fontSize: '16px', fontWeight: 'bold' }}>
                          {Math.round(
                            orderItem?.price - (orderItem?.price * orderItem?.discount) / 100,
                          ).toLocaleString()}
                          đ
                        </span>
                        <WrapperPriceDiscount>{Math.round(orderItem?.price).toLocaleString()}đ</WrapperPriceDiscount>
                      </div>

                      <WrapperCountOrder>
                        <ButtonComponent
                          icon={<MinusOutlined />}
                          size={'small'}
                          onClick={() => handleChangeCount(orderItem?.product, 'decrease', orderItem?.amount > 1)}
                        />
                        <WrapperInputNumber
                          value={orderItem?.amount}
                          defaultValue={1}
                          min={1}
                          max={orderItem?.countInStock}
                          readOnly
                          size={'small'}
                          style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            color: '#ffffff',
                            textAlign: 'center',
                          }}
                        />
                        <ButtonComponent
                          icon={<PlusOutlined />}
                          size={'small'}
                          onClick={() =>
                            handleChangeCount(
                              orderItem?.product,
                              'increase',
                              orderItem?.amount < orderItem?.countInStock,
                            )
                          }
                        />
                      </WrapperCountOrder>

                      <span style={{ color: '#D29B63', fontSize: '16px', fontWeight: 'bold' }}>
                        {Math.round(
                          orderItem?.amount * (orderItem?.price - (orderItem?.price * orderItem?.discount) / 100),
                        ).toLocaleString()}
                        đ
                      </span>

                      <DeleteOutlined
                        style={{ cursor: 'pointer', color: '#ff4d4f', fontSize: '16px' }}
                        onClick={() => handleRemoveOrderProduct(orderItem?.product)}
                      />
                    </div>
                  </WrapperItemOrder>
                );
              })}
            </WrapperListOrder>
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
                <span>{subtotalMemo.toLocaleString() || 0}đ</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>Giảm giá:</span>
                <span>{(subtotalMemo - subtotalAfterDiscountMemo).toLocaleString() || 0}đ</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>Thuế:</span>
                <span>0đ</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>Phí giao hàng:</span>
                <span>{shippingFeeMemo.toLocaleString() || 0}đ</span>
              </div>
            </WrapperInfo>

            <WrapperTotal>
              <span>Tổng tiền:</span>
              <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <span>{totalPriceMemo.toLocaleString() || 0}đ</span>
                <span>(Đã bao gồm VAT nếu có)</span>
              </span>
            </WrapperTotal>

            <ButtonComponent
              onClick={() => handleAddCard()}
              size={40}
              style={{
                backgroundColor: '#D29B63',
                height: isMobile ? '44px' : '48px',
                width: '100%',
                border: 'none',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: isMobile ? '15px' : '16px',
                fontWeight: '600',
                transition: 'all 0.3s ease',
              }}
              textbutton={'Mua hàng'}
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
        width={isMobile ? '90%' : '520px'}
      >
        <Loading isPending={isPending}>
          <Form
            name="basic"
            labelCol={isMobile ? { span: 24 } : { span: 4 }}
            wrapperCol={isMobile ? { span: 24 } : { span: 20 }}
            layout={isMobile ? 'vertical' : 'horizontal'}
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
    </div>
  );
};

export default OrderPage;
