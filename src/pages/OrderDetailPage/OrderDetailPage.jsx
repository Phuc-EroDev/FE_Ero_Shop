import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, message } from 'antd';
import { useSelector } from 'react-redux';
import { useMutationHook } from '../../hooks/useMutationHook';
import * as OrderService from '../../services/OrderService';
import {
  OrderSuccessContainer,
  OrderSuccessWrapper,
  OrderSuccessTitle,
  OrderSuccessSubtitle,
  OrderSuccessLayout,
  OrderSuccessLeftColumn,
  OrderSuccessRightColumn,
  OrderSuccessCard,
  OrderSuccessCardTitle,
  OrderSuccessCardSmallTitle,
  StatusBadgeContainer,
  StatusBadge,
  UserInfoGrid,
  UserInfoRow,
  UserInfoLabel,
  UserInfoValue,
  MethodGrid,
  MethodCard,
  ShippingContainer,
  ShippingBadge,
  ShippingName,
  PaymentMethod,
  ProductItem,
  ProductImage,
  ProductInfo,
  ProductName,
  ProductPriceRow,
  ProductPrice,
  ProductTotal,
  SummaryCard,
  SummaryTitle,
  SummarySection,
  SummaryRow,
  SummaryLabel,
  SummaryValue,
  SummaryTotal,
  SummaryTotalLabel,
  SummaryTotalValue,
  SummaryContact,
} from '../OrderSuccessPage/style';
import { orderConstants } from '../../constant';

const OrderDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const initialOrderData = state?.orderData;
  const [orderData, setOrderData] = useState(initialOrderData);
  const user = useSelector((state) => state?.user);

  const fetchOrderDetail = async () => {
    try {
      if (initialOrderData?._id && user?.access_token) {
        const response = await OrderService.getOrderDetail(
          initialOrderData._id,
          initialOrderData.user,
          user.access_token,
        );
        if (response?.status === 'OK') {
          setOrderData(response.data);
        }
      }
    } catch (error) {
      console.error('Error fetching order detail:', error);
    }
  };

  useEffect(() => {
    fetchOrderDetail();
  }, []);

  const mutationPayment = useMutationHook((data) => {
    const { orderId, userId, access_token } = data;
    return OrderService.updatePaymentStatus(orderId, userId, access_token);
  });

  const handleConfirmPayment = () => {
    mutationPayment.mutate(
      { orderId: orderData?._id, userId: orderData?.user, access_token: user?.access_token },
      {
        onSuccess: (data) => {
          if (data?.status === 'OK') {
            message.success('Xác nhận thanh toán thành công!');
            fetchOrderDetail();
          } else {
            message.error(data?.message || 'Có lỗi xảy ra');
          }
        },
        onError: () => {
          message.error('Có lỗi xảy ra khi xác nhận thanh toán');
        },
      },
    );
  };

  if (!orderData) {
    return (
      <OrderSuccessContainer>
        <OrderSuccessWrapper>
          <OrderSuccessTitle>Không tìm thấy đơn hàng</OrderSuccessTitle>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Button onClick={() => navigate('/my-order')}>Quay lại danh sách đơn hàng</Button>
          </div>
        </OrderSuccessWrapper>
      </OrderSuccessContainer>
    );
  }

  const getPaymentStatus = (paymentMethod, isPaid) => {
    if (paymentMethod === 'paypal') return 'paid';
    return isPaid ? 'paid' : 'pending';
  };

  const getDeliveryStatus = (isDelivered) => {
    return isDelivered ? 'delivered' : 'pending';
  };

  const calculateDiscount = () => {
    const totalPrice = orderData?.totalPrice || 0;
    const itemsPrice = orderData?.itemsPrice || 0;
    const shippingPrice = orderData?.shippingPrice || 0;
    const taxPrice = orderData?.taxPrice || 0;

    const discount = totalPrice - itemsPrice - shippingPrice - taxPrice;
    return discount;
  };

  return (
    <OrderSuccessContainer>
      <OrderSuccessWrapper>
        <OrderSuccessTitle>Chi tiết đơn hàng #{orderData?._id?.slice(-8)}</OrderSuccessTitle>
        <OrderSuccessSubtitle>
          Ngày đặt: {new Date(orderData?.createdAt).toLocaleDateString('vi-VN')}
        </OrderSuccessSubtitle>

        <OrderSuccessLayout>
          <OrderSuccessLeftColumn>
            <OrderSuccessCard>
              <OrderSuccessCardTitle>Trạng thái đơn hàng</OrderSuccessCardTitle>
              <StatusBadgeContainer>
                <StatusBadge type={getPaymentStatus(orderData?.paymentMethod, orderData?.isPaid)}>
                  {getPaymentStatus(orderData?.paymentMethod, orderData?.isPaid) === 'paid'
                    ? 'Đã thanh toán'
                    : 'Chưa thanh toán'}
                </StatusBadge>
                <StatusBadge type={getDeliveryStatus(orderData?.isDelivered)}>
                  {getDeliveryStatus(orderData?.isDelivered) === 'delivered' ? 'Đã giao hàng' : 'Đang giao hàng'}
                </StatusBadge>
              </StatusBadgeContainer>
            </OrderSuccessCard>

            <OrderSuccessCard>
              <OrderSuccessCardTitle>Thông tin người đặt hàng</OrderSuccessCardTitle>
              <UserInfoGrid>
                <UserInfoRow>
                  <UserInfoLabel>Họ và tên:</UserInfoLabel>
                  <UserInfoValue>{orderData?.shippingAddress?.fullName || 'Không có thông tin'}</UserInfoValue>
                </UserInfoRow>
                <UserInfoRow>
                  <UserInfoLabel>Số điện thoại:</UserInfoLabel>
                  <UserInfoValue>{orderData?.shippingAddress?.phone || 'Không có thông tin'}</UserInfoValue>
                </UserInfoRow>
                <UserInfoRow>
                  <UserInfoLabel>Địa chỉ:</UserInfoLabel>
                  <UserInfoValue>{orderData?.shippingAddress?.address || 'Không có thông tin'}</UserInfoValue>
                </UserInfoRow>
              </UserInfoGrid>
            </OrderSuccessCard>

            <MethodGrid>
              <MethodCard>
                <OrderSuccessCardSmallTitle>Giao hàng</OrderSuccessCardSmallTitle>
                <ShippingContainer>
                  <ShippingBadge>{orderConstants?.shipping[orderData?.shippingMethod]}</ShippingBadge>
                  <ShippingName>{orderConstants?.shippingName[orderData?.shippingMethod]}</ShippingName>
                </ShippingContainer>
              </MethodCard>

              <MethodCard>
                <OrderSuccessCardSmallTitle>Thanh toán</OrderSuccessCardSmallTitle>
                <PaymentMethod>{orderConstants?.payment[orderData?.paymentMethod]}</PaymentMethod>
              </MethodCard>
            </MethodGrid>

            <OrderSuccessCard>
              <OrderSuccessCardTitle>Sản phẩm đã đặt</OrderSuccessCardTitle>
              <div>
                {orderData?.orderItems?.map((orderItem) => (
                  <ProductItem key={orderItem?.product}>
                    <ProductImage
                      src={Array.isArray(orderItem?.image) ? orderItem?.image[0] : orderItem?.image}
                      alt="product"
                    />
                    <ProductInfo>
                      <ProductName>{orderItem?.name}</ProductName>
                      <ProductPriceRow>
                        <ProductPrice>
                          {orderItem?.price.toLocaleString()}đ x {orderItem?.amount}
                        </ProductPrice>
                        <ProductTotal>{(orderItem?.price * orderItem?.amount).toLocaleString()}đ</ProductTotal>
                      </ProductPriceRow>
                    </ProductInfo>
                  </ProductItem>
                ))}
              </div>
            </OrderSuccessCard>
          </OrderSuccessLeftColumn>

          <OrderSuccessRightColumn>
            <SummaryCard>
              <SummaryTitle>Tóm tắt đơn hàng</SummaryTitle>

              <SummarySection>
                <SummaryRow>
                  <SummaryLabel>Tạm tính:</SummaryLabel>
                  <SummaryValue>{orderData?.itemsPrice?.toLocaleString() || '0'}đ</SummaryValue>
                </SummaryRow>

                <SummaryRow>
                  <SummaryLabel>Phí vận chuyển:</SummaryLabel>
                  <SummaryValue>{orderData?.shippingPrice?.toLocaleString() || '0'}đ</SummaryValue>
                </SummaryRow>

                <SummaryRow>
                  <SummaryLabel>Thuế:</SummaryLabel>
                  <SummaryValue>{orderData?.taxPrice?.toLocaleString() || '0'}đ</SummaryValue>
                </SummaryRow>

                <SummaryRow>
                  <SummaryLabel>Giảm giá:</SummaryLabel>
                  <SummaryValue style={{ color: calculateDiscount() !== 0 ? '#52c41a' : 'inherit' }}>
                    {calculateDiscount() !== 0 ? `-${Math.abs(calculateDiscount()).toLocaleString()}đ` : '0đ'}
                  </SummaryValue>
                </SummaryRow>
              </SummarySection>

              <SummaryTotal>
                <SummaryTotalLabel>TỔNG CỘNG:</SummaryTotalLabel>
                <SummaryTotalValue>{orderData?.totalPrice?.toLocaleString() || '0'}đ</SummaryTotalValue>
              </SummaryTotal>

              <SummaryContact>
                Hotline hỗ trợ: <span className="highlight">+84 304 1975</span>
                <br />
                Email: phucvo140902@gmail.com
                <br />
                Mã đơn hàng: {orderData?._id}
              </SummaryContact>

              <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {!user?.isAdmin && !orderData?.isPaid && orderData?.paymentMethod !== 'paypal' && (
                  <Button
                    type="primary"
                    onClick={handleConfirmPayment}
                    loading={mutationPayment.isPending}
                    style={{
                      backgroundColor: '#1890ff',
                      borderColor: '#1890ff',
                      width: '100%',
                      height: '40px',
                      fontSize: '14px',
                    }}
                  >
                    Xác nhận thanh toán
                  </Button>
                )}
              </div>
            </SummaryCard>
          </OrderSuccessRightColumn>
        </OrderSuccessLayout>
      </OrderSuccessWrapper>
    </OrderSuccessContainer>
  );
};

export default OrderDetailPage;
