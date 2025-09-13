import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import * as OrderService from '../../services/OrderService';
import Loading from '../../components/LoadingComponent/Loading';
import { useSelector } from 'react-redux';
import { orderConstants } from '../../constant';
import {
  MyOrderContainer,
  MyOrderWrapper,
  MyOrderTitle,
  OrderCard,
  OrderHeader,
  OrderId,
  OrderStatus,
  StatusBadge,
  OrderBody,
  OrderInfo,
  InfoCard,
  InfoTitle,
  InfoContent,
  ShippingBadge,
  ProductList,
  ProductItem,
  ProductImage,
  ProductInfo,
  ProductName,
  ProductDetails,
  OrderFooter,
  TotalPrice,
  ActionButtons,
  ActionButton,
  EmptyState,
} from './style';
import { useLocation, useNavigate } from 'react-router-dom';
import { message } from 'antd';

const MyOrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const [cancellingOrder, setCancellingOrder] = useState(null);

  const fetchMyOrder = async () => {
    const res = await OrderService.getOrderByUserId(state?.id, state?.access_token);
    return res.data;
  };

  const queryOrder = useQuery({
    queryKey: ['order'],
    queryFn: fetchMyOrder,
  });
  const { isLoading: isLoadingOrders, data: orders } = queryOrder;

  const handleCancelOrder = async (order) => {
    try {
      setCancellingOrder(order._id);
      await OrderService.cancelOrder(order?._id, state?.access_token, order?.user, order?.orderItems);
      message.success('Đơn hàng đã được hủy thành công!');
      queryOrder.refetch();
    } catch (error) {
      message.error('Có lỗi xảy ra khi hủy đơn hàng!');
    } finally {
      setCancellingOrder(null);
    }
  };

  const handleViewDetail = (order) => {
    navigate('/order-detail', {
      state: {
        orderId: order._id,
        orderData: order,
        ...state,
      },
    });
  };

  const getPaymentStatus = (paymentMethod, isPaid) => {
    if (paymentMethod === 'paypal') return 'paid';
    return isPaid ? 'paid' : 'pending';
  };

  const getDeliveryStatus = (isDelivered) => {
    return isDelivered ? 'delivered' : 'pending';
  };

  return (
    <Loading isPending={isLoadingOrders}>
      <MyOrderContainer>
        <MyOrderWrapper>
          <MyOrderTitle>Đơn hàng của tôi</MyOrderTitle>

          {!orders || orders.length === 0 ? (
            <EmptyState>
              <h3>Chưa có đơn hàng nào</h3>
              <p>Bạn chưa có đơn hàng nào. Hãy mua sắm ngay!</p>
            </EmptyState>
          ) : (
            orders?.map((order) => (
              <OrderCard key={order?._id}>
                <OrderHeader>
                  <OrderId>Mã đơn hàng: #{order?._id?.slice(-8)}</OrderId>
                  <OrderStatus>
                    <StatusBadge status={getPaymentStatus(order?.paymentMethod, order?.isPaid)}>
                      {getPaymentStatus(order?.paymentMethod, order?.isPaid) === 'paid'
                        ? 'Đã thanh toán'
                        : 'Chưa thanh toán'}
                    </StatusBadge>
                    <StatusBadge status={getDeliveryStatus(order?.isDelivered)}>
                      {getDeliveryStatus(order?.isDelivered) === 'delivered' ? 'Đã giao hàng' : 'Đang giao hàng'}
                    </StatusBadge>
                  </OrderStatus>
                </OrderHeader>

                <OrderBody>
                  <OrderInfo>
                    <InfoCard>
                      <InfoTitle>Phương thức giao hàng</InfoTitle>
                      <InfoContent>
                        <ShippingBadge>{orderConstants?.shipping[order?.shippingMethod]}</ShippingBadge>
                        <span>{orderConstants?.shippingName[order?.shippingMethod]}</span>
                      </InfoContent>
                    </InfoCard>

                    <InfoCard>
                      <InfoTitle>Phương thức thanh toán</InfoTitle>
                      <InfoContent>{orderConstants?.payment[order?.paymentMethod]}</InfoContent>
                    </InfoCard>
                  </OrderInfo>

                  <ProductList>
                    {order?.orderItems?.map((orderItem) => (
                      <ProductItem key={orderItem?.product}>
                        <ProductImage
                          src={Array.isArray(orderItem?.image) ? orderItem?.image[0] : orderItem?.image}
                          alt="product"
                        />
                        <ProductInfo>
                          <ProductName>{orderItem?.name}</ProductName>
                          <ProductDetails>
                            <span>Giá: {orderItem?.price.toLocaleString()}đ</span>
                            <span>Số lượng: {orderItem?.amount}</span>
                            <span>Thành tiền: {(orderItem?.price * orderItem?.amount).toLocaleString()}đ</span>
                          </ProductDetails>
                        </ProductInfo>
                      </ProductItem>
                    ))}
                  </ProductList>
                </OrderBody>

                <OrderFooter>
                  <TotalPrice>Tổng tiền: {order?.totalPrice?.toLocaleString()}đ</TotalPrice>
                  <ActionButtons>
                    <ActionButton variant="detail" onClick={() => handleViewDetail(order)}>
                      Xem chi tiết
                    </ActionButton>
                    {!order?.isDelivered && !order?.isPaid && (
                      <ActionButton
                        variant="cancel"
                        onClick={() => handleCancelOrder(order)}
                        disabled={cancellingOrder === order._id}
                      >
                        {cancellingOrder === order._id ? 'Đang hủy...' : 'Hủy đơn hàng'}
                      </ActionButton>
                    )}
                  </ActionButtons>
                </OrderFooter>
              </OrderCard>
            ))
          )}
        </MyOrderWrapper>
      </MyOrderContainer>
    </Loading>
  );
};

export default MyOrderPage;
