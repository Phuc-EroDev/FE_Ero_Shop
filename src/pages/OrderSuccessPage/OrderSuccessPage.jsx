import React, { useEffect } from 'react';

import { WrapperContainer, WrapperMethodSection, WrapperItemOrder, WrapperItemInfo } from './style';
import { useSelector } from 'react-redux';
import Loading from '../../components/LoadingComponent/Loading';
import { useLocation } from 'react-router-dom';
import { orderConstants } from '../../constant';

const OrderSuccessPage = () => {
  const order = useSelector((state) => state?.order);
  const location = useLocation();
  const { state } = location;

  return (
    <div style={{ backgroundColor: '#1a1a1a', width: '100%', minHeight: '100vh', padding: '40px 120px' }}>
      <Loading isPending={false}>
        <div>
          <h3 style={{ color: '#ffffff', fontSize: '28px', marginBottom: '10px', textAlign: 'left' }}>
            Đặt hàng thành công:{' '}
          </h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
            <WrapperContainer>
              <WrapperMethodSection>
                <h4 className="method-title">Phương thức giao hàng</h4>
                <div className="method-badge">
                  <span className="badge fast">{orderConstants?.shipping[state?.shipping]}</span>
                  <span>Giao hàng tiết kiệm</span>
                </div>
              </WrapperMethodSection>

              <WrapperMethodSection>
                <h4 className="method-title">Phương thức thanh toán</h4>
                <div className="method-container">
                  <span>{orderConstants?.payment[state?.payment]}</span>
                </div>
              </WrapperMethodSection>

              <WrapperItemInfo>
                {state?.orders?.map((orderItem) => {
                  return (
                    <WrapperItemOrder key={orderItem?.product}>
                      <div style={{ width: '40%', display: 'flex', alignItems: 'center', gap: '12px' }}>
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
                        <div style={{ color: '#D29B63', fontSize: '16px', fontWeight: 'bold' }}>{orderItem?.name}</div>
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginLeft: '20px',
                        }}
                      >
                        <div>
                          <span style={{ color: '#ffffff', fontSize: '14px', fontWeight: '400' }}>
                            Giá tiền: {orderItem?.price.toLocaleString()}đ
                          </span>
                        </div>
                      </div>

                      <div style={{ marginLeft: '20px', marginRight: '20px' }}>
                        <span style={{ color: '#ffffff', fontSize: '14px', fontWeight: '400' }}>
                          Số lượng: {orderItem?.amount}
                        </span>
                      </div>
                    </WrapperItemOrder>
                  );
                })}
              </WrapperItemInfo>
              <div>
                <span style={{ color: '#cb8540', fontSize: '18px', fontWeight: 'bold' }}>
                  Tổng tiền: {state?.totalPrice.toLocaleString()}đ
                </span>
              </div>
            </WrapperContainer>
          </div>
        </div>
      </Loading>
    </div>
  );
};

export default OrderSuccessPage;
