import styled from 'styled-components';

export const WrapperStyleHeader = styled.div`
  background-color: #2a2a2a;
  padding: 16px 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  margin-bottom: 12px;`

  export const WrapperAddressInfo = styled.div`
  padding: 16px;
  background-color: #2a2a2a;
  border-radius: 8px;
  border: 1px solid #404040;
  margin-bottom: 16px;
  span {
    color: #ffffff;
    font-size: 14px;
    font-weight: 500;
  }
  
  @media (max-width: 768px) {
    padding: 12px 16px;
    
    span {
      font-size: 13px;
    }
  }
  
  @media (max-width: 576px) {
    padding: 10px 12px;
    
    span {
      font-size: 12px;
    }
  }
`;

export const WrapperContainer = styled.div`
  width: 100%;
  background-color: #2a2a2a;
  border-radius: 8px;
  margin: 0 auto;
  padding: 20px;
  
  @media (max-width: 768px) {
    padding: 16px;
  }
  
  @media (max-width: 576px) {
    padding: 12px;
  }
`;

export const WrapperListOrder = styled.div`
  margin-top: 16px;
`;

export const WrapperItemOrder = styled.div`
  width: 750px;
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #333333;
  margin-bottom: 12px;
  border-radius: 8px;
  border: 1px solid #444444;

  &:hover {
    background-color: #3a3a3a;
  }
  
  @media (max-width: 1200px) {
    width: 100%;
  }
  
  @media (max-width: 768px) {
    padding: 16px;
    flex-direction: column;
    align-items: flex-start;
  }
  
  @media (max-width: 576px) {
    padding: 12px;
  }
`;

export const WrapperPriceDiscount = styled.span`
  color: #888888;
  font-size: 12px;
  text-decoration: line-through;
  margin-left: 8px;
`;

export const WrapperCountOrder = styled.div`
  display: flex;
  align-items: center;
  width: 100px;
  border-radius: 6px;
  border: 1px solid #555555;
  background-color: #444444;
  margin: 0 16px;

  button {
    background-color: transparent !important;
    border: none !important;
    color: #d29b63 !important;

    &:hover {
      color: #ffffff !important;
      background-color: #d29b63 !important;
    }
  }
  
  @media (max-width: 768px) {
    margin: 8px 0;
  }
`;

export const WrapperRight = styled.div`
  width: 23%;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  
  @media (max-width: 992px) {
    width: 30%;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
    margin-top: 20px;
  }
`;

export const WrapperInfo = styled.div`
  padding: 20px;
  background-color: #2a2a2a;
  border-radius: 8px;
  width: 100%;

  div {
    margin-bottom: 12px;

    &:last-child {
      margin-bottom: 0;
    }

    span {
      color: #ffffff;

      &:last-child {
        color: #d29b63;
        font-weight: 600;
      }
    }
  }
`;

export const WrapperTotal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: #2a2a2a;
  border-radius: 8px;
  border: 2px solid #d29b63;

  > span:first-child {
    color: #ffffff;
    font-size: 16px;
    font-weight: 600;
  }

  > span:last-child {
    span:first-child {
      color: #d29b63;
      font-size: 24px;
      font-weight: bold;
    }

    span:last-child {
      color: #cccccc;
      font-size: 12px;
    }
  }
`;

export const WrapperMethodSection = styled.div`
  margin-bottom: 30px;

  .method-title {
    color: #ffffff;
    font-size: 18px;
    margin-bottom: 16px;
    font-weight: 600;
  }

  .method-container {
    background-color: #2a2a2a;
    border-radius: 8px;
    border: 1px solid #404040;
    padding: 16px;
  }

  .ant-radio-group {
    width: 100%;
  }

  .ant-radio-wrapper {
    color: #ffffff !important;
    font-size: 14px;
    font-weight: 500;
    padding: 8px 0;
    margin-right: 0;
    display: flex;
    align-items: center;

    &:not(:last-child) {
      margin-bottom: 12px;
    }
  }

  .ant-radio {
    .ant-radio-inner {
      background-color: transparent;
      border-color: #666666;

      &:hover {
        border-color: #d29b63;
      }
    }

    &.ant-radio-checked {
      .ant-radio-inner {
        background-color: #d29b63;
        border-color: #d29b63;
      }
    }
  }

  .method-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;

    .badge {
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
      color: #ffffff;

      &.fast {
        background-color: #d29b63;
      }

      &.standard {
        background-color: #52c41a;
      }
    }
  }
`;

export const WrapperItemInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Order Success Page Components
export const OrderSuccessContainer = styled.div`
  background-color: #1a1a1a;
  width: 100%;
  min-height: 100vh;
  padding: 40px;
  margin-top: -8px;
  
  @media (max-width: 768px) {
    padding: 20px 15px;
  }
`;

export const OrderSuccessWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const OrderSuccessTitle = styled.h3`
  color: #C68642;
  font-size: 28px;
  margin-bottom: 8px;
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

export const OrderSuccessSubtitle = styled.p`
  color: #B8B8B8;
  font-size: 16px;
  text-align: center;
  margin-bottom: 32px;
  
  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 24px;
  }
`;

export const OrderSuccessLayout = styled.div`
  display: flex;
  gap: 24px;
  align-items: flex-start;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

export const OrderSuccessLeftColumn = styled.div`
  flex: 2;
  min-width: 0;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const OrderSuccessRightColumn = styled.div`
  flex: 1;
  min-width: 300px;
  
  @media (max-width: 768px) {
    width: 100%;
    min-width: auto;
  }
`;

export const OrderSuccessCard = styled.div`
  background-color: #2a2a2a;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #333;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    padding: 15px;
    margin-bottom: 16px;
  }
`;

export const OrderSuccessCardTitle = styled.h4`
  color: #C68642;
  font-size: 16px;
  margin-bottom: 16px;
  font-weight: bold;
`;

export const OrderSuccessCardSmallTitle = styled.h4`
  color: #C68642;
  font-size: 14px;
  margin-bottom: 12px;
  font-weight: bold;
`;

export const StatusBadgeContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 10px;
  }
`;

export const StatusBadge = styled.span`
  color: #fff;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: bold;
  background-color: ${props => {
    if (props.type === 'paid') return '#4CAF50';
    if (props.type === 'pending') return '#FF9800';
    if (props.type === 'preparing') return '#2196F3';
    return '#666';
  }};
  
  @media (max-width: 768px) {
    padding: 4px 10px;
    font-size: 11px;
  }
`;

export const UserInfoGrid = styled.div`
  display: grid;
  gap: 12px;
`;

export const UserInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  
  @media (max-width: 768px) {
    flex-direction: column;
    margin-bottom: 8px;
  }
`;

export const UserInfoLabel = styled.span`
  color: #B8B8B8;
  font-size: 14px;
  
  @media (max-width: 768px) {
    margin-bottom: 4px;
  }
`;

export const UserInfoValue = styled.span`
  color: #E5E5E5;
  font-size: 14px;
  font-weight: 600;
  text-align: right;
  max-width: 60%;
  
  @media (max-width: 768px) {
    text-align: left;
    max-width: 100%;
    overflow-wrap: break-word;
  }
`;

export const MethodGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
    margin-bottom: 16px;
  }
`;

export const MethodCard = styled.div`
  background-color: #2a2a2a;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #333;
`;

export const ShippingContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
`;

export const ShippingBadge = styled.div`
  background-color: #C68642;
  color: #FDF6EC;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  display: inline-block;
`;

export const ShippingName = styled.div`
  color: #E5E5E5;
  font-size: 13px;
`;

export const PaymentMethod = styled.div`
  color: #E5E5E5;
  font-size: 13px;
  background-color: #333;
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #444;
`;

export const ProductItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  background-color: #333;
  border-radius: 8px;
  margin-bottom: 8px;
  border: 1px solid #444;
  
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #C68642;
  margin-right: 12px;
`;

export const ProductInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ProductName = styled.div`
  color: #E5E5E5;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
`;

export const ProductPriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const ProductPrice = styled.span`
  color: #B8B8B8;
  font-size: 12px;
  
  @media (max-width: 768px) {
    margin-bottom: 4px;
  }
`;

export const ProductTotal = styled.span`
  color: #C68642;
  font-size: 14px;
  font-weight: bold;
`;

export const SummaryCard = styled.div`
  background-color: #2a2a2a;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #333;
  position: sticky;
  top: 20px;
  
  @media (max-width: 768px) {
    position: relative;
    top: 0;
    padding: 15px;
  }
`;

export const SummaryTitle = styled.h4`
  color: #C68642;
  font-size: 16px;
  margin-bottom: 16px;
  font-weight: bold;
  text-align: center;
`;

export const SummarySection = styled.div`
  border-bottom: 1px solid #444;
  padding-bottom: 16px;
  margin-bottom: 16px;
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const SummaryLabel = styled.span`
  color: #B8B8B8;
  font-size: 14px;
`;

export const SummaryValue = styled.span`
  color: #E5E5E5;
  font-size: 14px;
`;

export const SummaryDiscount = styled.span`
  color: #4CAF50;
  font-size: 14px;
`;

export const SummaryTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: #333;
  border-radius: 8px;
  border: 1px solid #C68642;
  
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const SummaryTotalLabel = styled.span`
  color: #C68642;
  font-size: 16px;
  font-weight: bold;
  
  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

export const SummaryTotalValue = styled.span`
  color: #C68642;
  font-size: 20px;
  font-weight: bold;
  
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const SummaryContact = styled.div`
  margin-top: 16px;
  padding: 12px;
  background-color: #333;
  border-radius: 8px;
  color: #B8B8B8;
  font-size: 12px;
  line-height: 1.5;

  .highlight {
    color: #C68642;
  }
`;
