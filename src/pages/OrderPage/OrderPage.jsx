import React, { useMemo, useState } from 'react';
import { Checkbox } from 'antd';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import {
  WrapperCountOrder,
  WrapperInfo,
  WrapperItemOrder,
  WrapperLeft,
  WrapperListOrder,
  WrapperPriceDiscount,
  WrapperRight,
  WrapperStyleHeader,
  WrapperTotal,
} from './style';
import { WrapperInputNumber } from '../../components/ProductDetailsComponent/style';
import { useDispatch, useSelector } from 'react-redux';
import {
  decreaseAmountOrderProduct,
  increaseAmountOrderProduct,
  removeMultiOrderProduct,
  removeOrderProduct,
} from '../../redux/slides/orderSlide';

const OrderPage = () => {
  const [listChecked, setListChecked] = useState([]);
  const order = useSelector((state) => state?.order);
  const dispatch = useDispatch();
  const onChange = (e) => {
    if (listChecked?.includes(e.target.value)) {
      const newListChecked = listChecked?.filter((item) => item !== e.target.value);
      setListChecked(newListChecked);
    } else {
      setListChecked((prev) => [...prev, e.target.value]);
    }
  };

  const handleChangeCount = (idProduct, type) => {
    if (type === 'decrease') {
      dispatch(decreaseAmountOrderProduct(idProduct));
    } else if (type === 'increase') {
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

  const subtotalMemo = useMemo(() => {
    const result = order?.orderItems?.reduce((subtotal, orderItem) => {
      return subtotal + ((orderItem?.price * 100) / (100 - orderItem?.discount)) * orderItem?.amount;
    }, 0);
    return result;
  }, [order?.orderItems]);

  const subtotalAfterDiscountMemo = useMemo(() => {
    const result = order?.orderItems?.reduce((subtotalAfterDiscount, orderItem) => {
      return subtotalAfterDiscount + orderItem?.price * orderItem?.amount;
    }, 0);
    return result;
  }, [order?.orderItems]);

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

  return (
    <div style={{ backgroundColor: '#1a1a1a', width: '100%', minHeight: '100vh', padding: '40px 120px' }}>
      <div>
        <h3 style={{ color: '#ffffff', fontSize: '28px', marginBottom: '10px', textAlign: 'left' }}>Giỏ hàng</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
          <WrapperLeft>
            <WrapperStyleHeader>
              <span style={{ display: 'flex', alignItems: 'center', width: '40%' }}>
                <Checkbox
                  onChange={handleOnChangeCheckAll}
                  checked={listChecked?.length === order?.orderItems?.length}
                  style={{ marginRight: '12px' }}
                />
                <span>Tất cả ({order?.orderItems?.length} sản phẩm)</span>
              </span>
              <div
                style={{
                  display: 'flex',
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
                console.log('orderItem', orderItem);
                // subtotalAfterDiscount += Math.round(orderItem?.price * orderItem?.amount);
                return (
                  <WrapperItemOrder key={orderItem?.product}>
                    <div style={{ width: '40%', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Checkbox
                        onChange={onChange}
                        checked={listChecked?.includes(orderItem?.product)}
                        value={orderItem?.product}
                      />
                      <img
                        src={orderItem?.image}
                        alt="product"
                        style={{
                          width: '60px',
                          height: '60px',
                          objectFit: 'cover',
                          borderRadius: '6px',
                        }}
                      />
                      <div style={{ color: '#ffffff', fontSize: '14px', fontWeight: '500' }}>{orderItem?.name}</div>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingLeft: '20px',
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ color: '#D29B63', fontSize: '16px', fontWeight: 'bold' }}>
                          {(orderItem?.price).toLocaleString()}đ
                        </span>
                        <WrapperPriceDiscount>
                          {Math.round((orderItem?.price * 100) / (100 - orderItem?.discount)).toLocaleString()}đ
                        </WrapperPriceDiscount>
                      </div>

                      <WrapperCountOrder>
                        <ButtonComponent
                          icon={<MinusOutlined />}
                          size={'small'}
                          onClick={() => handleChangeCount(orderItem?.product, 'decrease')}
                        />
                        <WrapperInputNumber
                          value={orderItem?.amount}
                          defaultValue={1}
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
                          onClick={() => handleChangeCount(orderItem?.product, 'increase')}
                        />
                      </WrapperCountOrder>

                      <span style={{ color: '#D29B63', fontSize: '16px', fontWeight: 'bold' }}>
                        {Math.round(orderItem?.amount * orderItem?.price).toLocaleString()}đ
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
              textbutton={'Thanh toán'}
            />
          </WrapperRight>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
