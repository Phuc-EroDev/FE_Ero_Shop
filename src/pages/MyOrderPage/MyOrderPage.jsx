import React from 'react';
import { useQuery } from '@tanstack/react-query';
import * as OrderService from '../../services/OrderService';
import Loading from '../../components/LoadingComponent/Loading';
import { useSelector } from 'react-redux';
import { orderConstants } from '../../constant';
import { WrapperContainer, WrapperItemInfo, WrapperItemOrder, WrapperMethodSection } from './style';
import { useLocation } from 'react-router-dom';

const MyOrderPage = () => {
  const location = useLocation();
  const { state } = location;
  const fetchMyOrder = async () => {
    const res = await OrderService.getOrderByUserId(state?.id, state?.access_token);
    return res.data;
  };
  const queryOrder = useQuery({
    queryKey: ['order'],
    queryFn: fetchMyOrder,
  });
  const { isLoading: isLoadingOrders, data: orders } = queryOrder;

  return (
    <Loading isPending={isLoadingOrders}>
      <div style={{ backgroundColor: '#1a1a1a', width: '100%', minHeight: '100vh', padding: '10px 120px' }}>
        {orders?.map((order) => (
          <div
            key={order?._id}
            style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', padding: '10px 0' }}
          >
            <WrapperContainer>
              <WrapperMethodSection>
                <h4 className="method-title">Phương thức giao hàng</h4>
                <div className="method-badge">
                  <span className="badge fast">{orderConstants?.shipping['fast']}</span>
                  <span>Giao hàng tiết kiệm</span>
                </div>
              </WrapperMethodSection>

              <WrapperMethodSection>
                <h4 className="method-title">Phương thức thanh toán</h4>
                <div className="method-container">
                  <span>{orderConstants?.payment[order?.paymentMethod]}</span>
                </div>
              </WrapperMethodSection>

              <WrapperItemInfo>
                {order?.orderItems?.map((orderItem) => {
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
                  Tổng tiền: {order?.totalPrice?.toLocaleString()}đ
                </span>
              </div>
            </WrapperContainer>
          </div>
        ))}
      </div>
    </Loading>
  );
};

export default MyOrderPage;
