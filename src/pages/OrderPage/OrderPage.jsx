import React, { useState } from 'react';
import { Checkbox } from 'antd';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import image from '../../assets/images/slider2.png';
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

const OrderPage = ({ count = 1 }) => {
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const handleChangeCount = () => {};

  const handleOnChangeCheckAll = (e) => {};

  return (
    <div style={{ backgroundColor: '#1a1a1a', width: '100%', minHeight: '100vh', padding: '40px 120px' }}>
      <div>
        <h3 style={{ color: '#ffffff', fontSize: '28px', marginBottom: '10px', textAlign: 'left' }}>Giỏ hàng</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
          <WrapperLeft>
            <WrapperStyleHeader>
              <span style={{ display: 'flex', alignItems: 'center', width: '40%' }}>
                <Checkbox onChange={handleOnChangeCheckAll} style={{ marginRight: '12px' }} />
                <span>Tất cả ({count} sản phẩm)</span>
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
                <DeleteOutlined style={{ cursor: 'pointer', color: '#D29B63', fontSize: '16px' }} />
              </div>
            </WrapperStyleHeader>

            <WrapperListOrder>
              <WrapperItemOrder>
                <div style={{ width: '40%', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Checkbox onChange={onChange} />
                  <img
                    src={image}
                    alt="product"
                    style={{
                      width: '60px',
                      height: '60px',
                      objectFit: 'cover',
                      borderRadius: '6px',
                    }}
                  />
                  <div style={{ color: '#ffffff', fontSize: '14px', fontWeight: '500' }}>Name sản phẩm</div>
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
                    <span style={{ color: '#D29B63', fontSize: '16px', fontWeight: 'bold' }}>100.000đ</span>
                    <WrapperPriceDiscount>230.000đ</WrapperPriceDiscount>
                  </div>

                  <WrapperCountOrder>
                    <ButtonComponent icon={<MinusOutlined />} size={'small'} />
                    <WrapperInputNumber
                      value={10}
                      defaultValue={10}
                      size={'small'}
                      onChange={onChange}
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: '#ffffff',
                        textAlign: 'center',
                      }}
                    />
                    <ButtonComponent icon={<PlusOutlined />} size={'small'} />
                  </WrapperCountOrder>

                  <span style={{ color: '#D29B63', fontSize: '16px', fontWeight: 'bold' }}>1.000.000đ</span>

                  <DeleteOutlined style={{ cursor: 'pointer', color: '#ff4d4f', fontSize: '16px' }} />
                </div>
              </WrapperItemOrder>
            </WrapperListOrder>
          </WrapperLeft>

          <WrapperRight>
            <WrapperInfo>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>Tạm tính:</span>
                <span>0đ</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>Giảm giá:</span>
                <span>0đ</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>Thuế:</span>
                <span>0đ</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>Phí giao hàng:</span>
                <span>0đ</span>
              </div>
            </WrapperInfo>

            <WrapperTotal>
              <span>Tổng tiền:</span>
              <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <span>100.000đ</span>
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
