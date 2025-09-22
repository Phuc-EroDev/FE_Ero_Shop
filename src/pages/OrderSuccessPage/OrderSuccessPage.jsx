import React, { useEffect } from 'react';
import { useResponsive } from '../../hooks/useResponsive';

import {
  WrapperContainer,
  WrapperMethodSection,
  WrapperItemOrder,
  WrapperItemInfo,
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
  SummaryDiscount,
  SummaryTotal,
  SummaryTotalLabel,
  SummaryTotalValue,
  SummaryContact,
} from './style';
import { useSelector } from 'react-redux';
import Loading from '../../components/LoadingComponent/Loading';
import { useLocation } from 'react-router-dom';
import { orderConstants } from '../../constant';

const OrderSuccessPage = () => {
  const { isMobile } = useResponsive();
  const order = useSelector((state) => state?.order);
  const location = useLocation();
  const { state } = location;

  return (
    <OrderSuccessContainer>
      <Loading isPending={false}>
        <OrderSuccessWrapper>
          <OrderSuccessTitle>Đặt hàng thành công!</OrderSuccessTitle>
          <OrderSuccessSubtitle>Cảm ơn bạn đã tin tưởng và mua hàng tại EroShop</OrderSuccessSubtitle>

          {/* Layout 2 cột */}
          <OrderSuccessLayout>
            {/* Cột trái - Thông tin chính */}
            <OrderSuccessLeftColumn>
              {/* Trạng thái đơn hàng */}
              <OrderSuccessCard>
                <OrderSuccessCardTitle>Trạng thái đơn hàng</OrderSuccessCardTitle>
                <StatusBadgeContainer>
                  <StatusBadge type={state?.payment === 'paypal' ? 'paid' : 'pending'}>
                    {state?.payment === 'paypal' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                  </StatusBadge>
                  <StatusBadge type="preparing">Đang chuẩn bị</StatusBadge>
                </StatusBadgeContainer>
              </OrderSuccessCard>

              {/* Thông tin người đặt hàng */}
              <OrderSuccessCard>
                <OrderSuccessCardTitle>Thông tin người đặt hàng</OrderSuccessCardTitle>
                <UserInfoGrid>
                  <UserInfoRow>
                    <UserInfoLabel>Họ và tên:</UserInfoLabel>
                    <UserInfoValue>{state?.user?.fullName || 'Không có thông tin'}</UserInfoValue>
                  </UserInfoRow>
                  <UserInfoRow>
                    <UserInfoLabel>Số điện thoại:</UserInfoLabel>
                    <UserInfoValue>{state?.user?.phone || 'Không có thông tin'}</UserInfoValue>
                  </UserInfoRow>
                  <UserInfoRow>
                    <UserInfoLabel>Địa chỉ:</UserInfoLabel>
                    <UserInfoValue>
                      {state?.user?.address ? `${state.user.address}, ${state.user.city || ''}` : 'Không có thông tin'}
                    </UserInfoValue>
                  </UserInfoRow>
                </UserInfoGrid>
              </OrderSuccessCard>

              {/* Phương thức */}
              <MethodGrid>
                <MethodCard>
                  <OrderSuccessCardSmallTitle>Giao hàng</OrderSuccessCardSmallTitle>
                  <ShippingContainer>
                    <ShippingBadge>{orderConstants?.shipping[state?.shipping]}</ShippingBadge>
                    <ShippingName>{orderConstants?.shippingName[state?.shipping]}</ShippingName>
                  </ShippingContainer>
                </MethodCard>

                <MethodCard>
                  <OrderSuccessCardSmallTitle>Thanh toán</OrderSuccessCardSmallTitle>
                  <PaymentMethod>{orderConstants?.payment[state?.payment]}</PaymentMethod>
                </MethodCard>
              </MethodGrid>

              {/* Danh sách sản phẩm */}
              <OrderSuccessCard>
                <OrderSuccessCardTitle>Sản phẩm đã đặt</OrderSuccessCardTitle>
                <div>
                  {state?.orders?.map((orderItem) => {
                    return (
                      <ProductItem key={orderItem?.product}>
                        <ProductImage
                          src={Array.isArray(orderItem?.image) ? orderItem?.image[0].url : orderItem?.image}
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
                    );
                  })}
                </div>
              </OrderSuccessCard>
            </OrderSuccessLeftColumn>

            {/* Cột phải - Tóm tắt đơn hàng */}
            <OrderSuccessRightColumn>
              <SummaryCard>
                <SummaryTitle>Tóm tắt đơn hàng</SummaryTitle>

                <SummarySection>
                  <SummaryRow>
                    <SummaryLabel>Tạm tính:</SummaryLabel>
                    <SummaryValue>{state?.subtotal?.toLocaleString() || '0'}đ</SummaryValue>
                  </SummaryRow>

                  <SummaryRow>
                    <SummaryLabel>Phí vận chuyển:</SummaryLabel>
                    <SummaryValue>{state?.shippingPrice?.toLocaleString() || '0'}đ</SummaryValue>
                  </SummaryRow>

                  {state?.subtotalAfterDiscount && state?.subtotalAfterDiscount !== state?.subtotal && (
                    <SummaryRow>
                      <SummaryLabel>Giảm giá:</SummaryLabel>
                      <SummaryDiscount>
                        -{(state?.subtotal - state?.subtotalAfterDiscount)?.toLocaleString()}đ
                      </SummaryDiscount>
                    </SummaryRow>
                  )}
                </SummarySection>

                <SummaryTotal>
                  <SummaryTotalLabel>TỔNG CỘNG:</SummaryTotalLabel>
                  <SummaryTotalValue>{state?.totalPrice?.toLocaleString() || '0'}đ</SummaryTotalValue>
                </SummaryTotal>

                {/* Thông tin bổ sung */}
                <SummaryContact>
                  Hotline hỗ trợ: <span className="highlight">+84 304 1975</span>
                  <br />
                  Email: phucrot22@gmail.com
                  <br />
                  Dự kiến giao hàng: 2-3 ngày làm việc
                </SummaryContact>
              </SummaryCard>
            </OrderSuccessRightColumn>
          </OrderSuccessLayout>
        </OrderSuccessWrapper>
      </Loading>
    </OrderSuccessContainer>
  );
};

export default OrderSuccessPage;
