import styled from 'styled-components';

export const MyOrderContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 20px;
  margin-top: -60px; // Fix for DefaultComponent padding
`;

export const MyOrderWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 10px;
`;

export const MyOrderTitle = styled.h1`
  color: #ffffff;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
  text-align: center;
  font-weight: bold;
  
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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    border-color: #C68642;
    box-shadow: 0 6px 12px rgba(198, 134, 66, 0.1);
  }
  
  @media (max-width: 768px) {
    border-radius: 8px;
    margin-bottom: 16px;
  }
`;

export const OrderHeader = styled.div`
  padding: 16px 20px;
  background-color: #333333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding: 12px 16px;
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
  font-weight: 600;
  background-color: ${props => {
    if (props.status === 'paid') return '#4CAF50';
    if (props.status === 'delivered') return '#2196F3';
    if (props.status === 'pending') return '#FF9800';
    if (props.status === 'cancelled') return '#F44336';
    return '#666';
  }};
  color: white;
  
  @media (max-width: 768px) {
    padding: 3px 10px;
    font-size: 11px;
  }
`;

export const OrderBody = styled.div`
  padding: 20px;
  
  @media (max-width: 768px) {
    padding: 12px;
  }
`;

export const OrderInfo = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
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
  align-items: center;
  padding: 12px;
  background-color: #333;
  border-radius: 8px;
  margin-bottom: 8px;
  border: 1px solid #444;

  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 768px) {
    padding: 12px;
    flex-direction: ${props => props.isMobile ? 'row' : 'row'};
    align-items: ${props => props.isMobile ? 'center' : 'center'};
    gap: 10px;
  }
`;

export const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #C68642;
  margin-right: 16px;
  
  @media (max-width: 768px) {
    margin-right: 0;
    width: 60px;
    height: 60px;
    flex-shrink: 0;
  }
`;

export const ProductInfo = styled.div`
  flex: 1;
  min-width: 0;
  
  @media (max-width: 768px) {
    width: calc(100% - 70px);
    flex: 1;
    min-width: 0;
  }
`;

export const ProductName = styled.div`
  color: #E5E5E5;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
  
  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 6px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const ProductDetails = styled.div`
  display: flex;
  gap: 20px;
  color: #B8B8B8;
  font-size: 14px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 4px;
    font-size: 12px;
  }
`;

export const OrderFooter = styled.div`
  padding: 16px 20px;
  border-top: 1px solid #404040;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding: 12px 16px;
  }
`;

export const TotalPrice = styled.div`
  color: #C68642;
  font-size: 18px;
  font-weight: bold;
  
  @media (max-width: 768px) {
    width: 100%;
    font-size: 16px;
    margin-bottom: 0;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  
  @media (max-width: 768px) {
    width: 100%;
    gap: 10px;
    display: flex;
    justify-content: space-between;
    
    button {
      flex: 1;
    }
  }
`;

export const ActionButton = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;

  ${props => {
    if (props.variant === 'cancel') {
      return `
        background-color: #F44336;
        color: white;
        
        &:hover {
          background-color: #D32F2F;
        }
      `;
    }
    if (props.variant === 'detail') {
      return `
        background-color: transparent;
        color: #C68642;
        border: 1px solid #C68642;
        
        &:hover {
          background-color: #C68642;
          color: white;
        }
      `;
    }
    return '';
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    padding: 8px 10px;
    font-size: 12px;
    white-space: nowrap;
    min-width: 100px;
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
    font-size: 16px;
  }
  
  @media (max-width: 768px) {
    padding: 40px 15px;
    
    h3 {
      font-size: 18px;
    }
    
    p {
      font-size: 14px;
    }
  }
`;