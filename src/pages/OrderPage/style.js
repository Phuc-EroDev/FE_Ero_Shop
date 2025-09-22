import styled from 'styled-components';

export const WrapperAddressInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background-color: #333333;
  border-radius: 8px;
  border: 1px solid #444444;
  
  .address-title {
    font-weight: 600;
    color: #ffffff;
    font-size: 15px;
    margin-bottom: 4px;
  }
  
  .address-content {
    color: #cccccc;
    font-size: 14px;
    line-height: 1.5;
  }
  
  .address-change {
    color: #c68642;
    font-size: 14px;
    cursor: pointer;
    align-self: flex-start;
    margin-top: 8px;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  @media (max-width: 768px) {
    padding: 14px;
    gap: 10px;
    
    .address-title {
      font-size: 14px;
    }
    
    .address-content {
      font-size: 13px;
    }
    
    .address-change {
      font-size: 13px;
    }
  }
  
  @media (max-width: 576px) {
    padding: 12px;
    gap: 8px;
  }
`;

export const WrapperStyleHeader = styled.div`
  background-color: #2a2a2a;
  padding: 16px 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    padding: 10px 12px;
  }
  
  span {
    color: #ffffff;
    font-size: 14px;
    font-weight: 500;
    
    @media (max-width: 768px) {
      font-size: 12px;
    }
  }
`;

export const WrapperStyleHeaderShipping = styled.div`
  background-color: #2a2a2a;
  border-radius: 8px;
  border: 1px solid #404040;
  padding: 20px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    display: none;
  }

  /* Custom Antd Steps */
  .ant-steps {
    .ant-steps-item {
      .ant-steps-item-container {
        .ant-steps-item-icon {
          background-color: #666666;
          border-color: #666666;
          width: 32px;
          height: 32px;

          .ant-steps-icon {
            color: #ffffff;
            font-size: 14px;
            font-weight: 600;
          }
        }

        .ant-steps-item-content {
          .ant-steps-item-title {
            color: #cccccc;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 4px;

            &::after {
              background-color: #404040;
            }
          }

          .ant-steps-item-description {
            color: #999999;
            font-size: 13px;
          }
        }
      }

      &.ant-steps-item-finish {
        .ant-steps-item-icon {
          background-color: #c68642;
          border-color: #c68642;
        }

        .ant-steps-item-content {
          .ant-steps-item-title {
            color: #ffffff;

            &::after {
              background-color: #c68642;
            }
          }
        }
      }

      &.ant-steps-item-active {
        .ant-steps-item-icon {
          background-color: #c68642;
          border-color: #c68642;
        }

        .ant-steps-item-content {
          .ant-steps-item-title {
            color: #ffffff;
          }
        }
      }
    }
  }
  
  @media (max-width: 768px) {
    padding: 16px;
    margin-bottom: 16px;
    
    .ant-steps {
      .ant-steps-item {
        padding-left: 0;
        
        .ant-steps-item-container {
          .ant-steps-item-content {
            .ant-steps-item-title {
              font-size: 13px;
            }
            
            .ant-steps-item-description {
              font-size: 12px;
            }
          }
        }
      }
    }
  }
  
  @media (max-width: 576px) {
    padding: 12px;
    margin-bottom: 12px;
    
    .ant-steps {
      display: flex;
      flex-direction: column;
      gap: 20px;
      
      .ant-steps-item {
        margin-right: 0;
        
        .ant-steps-item-container {
          display: flex;
          align-items: center;
          
          .ant-steps-item-icon {
            margin-right: 12px;
          }
          
          .ant-steps-item-content {
            .ant-steps-item-title {
              &::after {
                display: none;
              }
            }
          }
        }
      }
    }
  }
`;

export const WrapperContainer = styled.div`
  display: flex;
  gap: 24px;
  
  @media (max-width: 992px) {
    flex-direction: column;
    gap: 20px;
  }
  
  @media (max-width: 576px) {
    gap: 16px;
  }
`;

export const WrapperLeft = styled.div`
  width: 75%;
  background-color: #2a2a2a;
  border-radius: 8px;
  padding: 20px;
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 15px;
  }
`;

export const WrapperListOrder = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  @media (max-width: 576px) {
    gap: 8px;
  }
`;

export const WrapperItemOrder = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: #2a2a2a;
  border-radius: 8px;
  border: 1px solid #444444;

  @media (max-width: 768px) {
    padding: 15px;
    flex-direction: column;
    align-items: flex-start;
  }

  &:hover {
    background-color: #3a3a3a;
  }
`;

export const WrapperPriceDiscount = styled.span`
  color: #999999;
  font-size: 13px;
  text-decoration: line-through;
  margin-right: 8px;
  
  @media (max-width: 576px) {
    font-size: 12px;
    margin-right: 6px;
  }
`;

export const WrapperCountOrder = styled.div`
  display: flex;
  align-items: center;
  width: 120px;
  border-radius: 8px;
  border: 1px solid #555555;
  background-color: #333333;
  margin: 0 16px;
  overflow: hidden;
  
  @media (max-width: 768px) {
    width: 90px;
    margin: 0;
    border: 1px solid #666666;
    background-color: #3a3a3a;
  }

  button {
    background-color: transparent;
    border: none !important;
    color: #d29b63;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;

    &:hover {
      color: #ffffff !important;
      background-color: #d29b63 !important;
    }

    .anticon {
      font-size: 10px;
      
      @media (max-width: 768px) {
        font-size: 9px;
      }
    }
  }

  .ant-input-number {
    background-color: transparent;
    border: none;
    color: #ffffff;
    text-align: center;
    flex: 1;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    @media (max-width: 768px) {
      height: 28px;
    }

    .ant-input-number-input {
      background-color: transparent;
      border: none;
      color: #ffffff;
      text-align: center;
      font-weight: 500;
      padding: 0;
      height: 100%;
      line-height: 32px;
      margin: 0;
      font-size: 14px;
      
      @media (max-width: 768px) {
        line-height: 28px;
        font-size: 13px;
      }
    }

    .ant-input-number-input-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }

    .ant-input-number-handler-wrap {
      display: none;
    }
  }
`;

export const WrapperRight = styled.div`
  width: 23%;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  
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
  
  @media (max-width: 768px) {
    padding: 15px;
  }

  div {
    margin-bottom: 12px;
  }
`;

export const WrapperTotal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #404040;
  
  .total-text {
    font-size: 16px;
    color: #ffffff;
    font-weight: 600;
  }
  
  .total-price {
    font-size: 18px;
    color: #c68642;
    font-weight: 700;
  }
  
  @media (max-width: 576px) {
    margin-top: 12px;
    padding-top: 12px;
    
    .total-text {
      font-size: 15px;
    }
    
    .total-price {
      font-size: 16px;
    }
  }
`;

export const WrapperItemOrderInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  
  .label {
    font-size: 14px;
    color: #cccccc;
  }
  
  .value {
    font-size: 14px;
    color: #ffffff;
    font-weight: 500;
    text-align: right;
  }
  
  @media (max-width: 576px) {
    .label, .value {
      font-size: 13px;
    }
  }
`;

export const WrapperProductInfo = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  gap: 16px;
  
  .product-image {
    width: 80px;
    height: 80px;
    border-radius: 8px;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  
  .product-details {
    flex: 1;
    
    .product-name {
      font-size: 15px;
      color: #ffffff;
      font-weight: 500;
      margin-bottom: 4px;
    }
    
    .product-type {
      font-size: 13px;
      color: #999999;
    }
    
    .product-price {
      margin-top: 8px;
      display: flex;
      align-items: center;
      
      .current-price {
        font-size: 15px;
        color: #c68642;
        font-weight: 600;
      }
    }
  }
  
  @media (max-width: 768px) {
    gap: 12px;
    
    .product-image {
      width: 70px;
      height: 70px;
    }
    
    .product-details {
      .product-name {
        font-size: 14px;
      }
      
      .product-type {
        font-size: 12px;
      }
      
      .product-price {
        margin-top: 6px;
        
        .current-price {
          font-size: 14px;
        }
      }
    }
  }
  
  @media (max-width: 576px) {
    width: 100%;
    gap: 10px;
    
    .product-image {
      width: 60px;
      height: 60px;
    }
  }
`;

export const WrapperStyleHeaderDilivery = styled.div`
  background-color: #2a2a2a;
  padding: 16px 20px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    padding: 15px;
    background-color: #333333;
    border: 1px solid #555555;
  }

  .address-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .address-label {
    color: #cccccc;
    font-size: 14px;
    font-weight: 500;
    
    @media (max-width: 768px) {
      font-size: 14px;
      color: #d9d9d9;
    }
  }
  
  span.change-address {
    color: #c68642;
    cursor: pointer;
    text-decoration: underline;
    transition: color 0.3s ease;
    padding: 2px 5px;
    
    @media (max-width: 768px) {
      color: #1677ff;
      border-radius: 4px;
    }

    &:hover {
      border-color: #c68642;
    }
    
    &.active {
      border-color: #c68642;
      background-color: rgba(198, 134, 66, 0.1);
    }
  }

  .address-preview {
    color: #d29b63;
    font-size: 15px;
    font-weight: 600;
    line-height: 1.4;
    margin-left: 4px;
    padding: 4px 0;
    
    @media (max-width: 768px) {
      background-color: #3a3a3a;
      border-radius: 4px;
      padding: 8px 10px;
      margin-left: 0;
      width: 100%;
    }

    &.placeholder {
      color: #888888;
      font-style: italic;
      font-weight: 400;
    }
  }
`;
