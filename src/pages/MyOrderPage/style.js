import styled from 'styled-components';

export const MyOrderContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #222222;
  padding: 24px 0;
  
  @media (max-width: 768px) {
    padding: 16px 0;
  }
`;

export const MyOrderWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
`;

export const MyOrderTitle = styled.h1`
  color: #ffffff;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 16px;
  }
`;

export const OrderCard = styled.div`
  background-color: #2a2a2a;
  border-radius: 8px;
  border: 1px solid #404040;
  margin-bottom: 24px;
  overflow: hidden;
  
  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
`;

export const OrderHeader = styled.div`
  padding: 16px 20px;
  background-color: #333333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #404040;
  
  @media (max-width: 768px) {
    padding: 12px 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

export const OrderId = styled.span`
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
`;

export const OrderStatus = styled.div`
  display: flex;
  gap: 12px;
  
  @media (max-width: 576px) {
    gap: 8px;
  }
`;

export const StatusBadge = styled.span`
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${({ status }) => 
    status === 'paid' ? 'rgba(46, 196, 84, 0.2)' : 
    status === 'delivered' ? 'rgba(46, 196, 196, 0.2)' : 
    'rgba(255, 180, 0, 0.2)'};
  color: ${({ status }) => 
    status === 'paid' ? '#2ec454' : 
    status === 'delivered' ? '#2ec4c4' : 
    '#ffb400'};
`;

export const OrderBody = styled.div`
  padding: 20px;
  
  @media (max-width: 768px) {
    padding: 16px;
  }
  
  @media (max-width: 576px) {
    padding: 12px;
  }
`;

export const OrderInfo = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    margin-bottom: 16px;
  }
`;

export const InfoCard = styled.div`
  flex: 1;
  background-color: #333333;
  padding: 16px;
  border-radius: 6px;
  
  @media (max-width: 768px) {
    padding: 12px;
  }
`;

export const InfoTitle = styled.h3`
  color: #999999;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 8px;
  
  @media (max-width: 576px) {
    font-size: 12px;
    margin-bottom: 6px;
  }
`;

export const InfoContent = styled.div`
  color: #ffffff;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  
  @media (max-width: 576px) {
    font-size: 13px;
    gap: 8px;
  }
`;

export const ShippingBadge = styled.span`
  padding: 4px 8px;
  background-color: rgba(198, 134, 66, 0.2);
  color: #c68642;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  
  @media (max-width: 576px) {
    padding: 3px 6px;
    font-size: 11px;
  }
`;

export const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  
  @media (max-width: 768px) {
    gap: 12px;
  }
`;

export const ProductItem = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
  background-color: #333333;
  border-radius: 6px;
  
  @media (max-width: 768px) {
    padding: 12px;
    gap: 12px;
  }
  
  @media (max-width: 576px) {
    padding: 10px;
    gap: 10px;
  }
`;

export const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  
  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
  }
  
  @media (max-width: 576px) {
    width: 60px;
    height: 60px;
  }
`;

export const ProductInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ProductName = styled.h4`
  color: #ffffff;
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 8px;
  
  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 6px;
  }
  
  @media (max-width: 576px) {
    font-size: 13px;
    margin-bottom: 4px;
  }
`;

export const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  
  span {
    color: #cccccc;
    font-size: 13px;
    
    @media (max-width: 576px) {
      font-size: 12px;
    }
  }
`;

export const OrderFooter = styled.div`
  padding: 16px 20px;
  border-top: 1px solid #404040;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    padding: 12px 16px;
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
`;

export const TotalPrice = styled.div`
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-end;
    gap: 10px;
  }
  
  @media (max-width: 576px) {
    flex-direction: column;
    width: 100%;
    gap: 8px;
  }
`;

export const ActionButton = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
  
  background-color: ${({ variant }) => 
    variant === 'detail' ? '#333333' : 
    variant === 'cancel' ? 'rgba(220, 53, 69, 0.1)' : 
    '#c68642'};
  
  color: ${({ variant }) => 
    variant === 'detail' ? '#ffffff' : 
    variant === 'cancel' ? '#dc3545' : 
    '#ffffff'};
  
  border: ${({ variant }) => 
    variant === 'detail' ? '1px solid #444444' : 
    variant === 'cancel' ? '1px solid rgba(220, 53, 69, 0.3)' : 
    'none'};
  
  &:hover {
    background-color: ${({ variant }) => 
      variant === 'detail' ? '#444444' : 
      variant === 'cancel' ? 'rgba(220, 53, 69, 0.2)' : 
      '#b67535'};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    padding: 6px 14px;
    font-size: 13px;
  }
  
  @media (max-width: 576px) {
    width: 100%;
    padding: 8px 12px;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  background-color: #2a2a2a;
  border-radius: 8px;
  border: 1px solid #404040;
  
  h3 {
    color: #ffffff;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 8px;
  }
  
  p {
    color: #cccccc;
    font-size: 14px;
  }
  
  @media (max-width: 768px) {
    padding: 30px 16px;
    
    h3 {
      font-size: 16px;
    }
    
    p {
      font-size: 13px;
    }
  }
`;