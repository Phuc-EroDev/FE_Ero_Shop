import styled from 'styled-components';

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
            color: #888888;
            font-size: 12px;
          }
        }
      }

      /* Active state */
      &.ant-steps-item-process {
        .ant-steps-item-icon {
          background-color: #1890ff;
          border-color: #1890ff;
        }

        .ant-steps-item-title {
          color: #1890ff !important;
        }
      }

      /* Finished state */
      &.ant-steps-item-finish {
        .ant-steps-item-icon {
          background-color: #52c41a;
          border-color: #52c41a;
        }

        .ant-steps-item-title {
          color: #52c41a !important;
        }
      }

      /* Connector line */
      &:not(:last-child) {
        .ant-steps-item-container::after {
          background-color: #404040;
          height: 1px;
          top: 16px;
        }
      }

      /* Active connector */
      &.ant-steps-item-finish:not(:last-child) {
        .ant-steps-item-container::after {
          background-color: #52c41a;
        }
      }
    }
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
  margin-top: 16px;
`;

export const WrapperItemOrder = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #333333;
  margin-bottom: 12px;
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
  color: #888888;
  font-size: 12px;
  text-decoration: line-through;
  margin-left: 8px;
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

export const WrapperAddressInfo = styled.div`
  padding: 16px;
  background-color: #2a2a2a;
  border-radius: 8px;
  border: 1px solid #404040;
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

  .change-button {
    color: #4096ff;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    text-decoration: underline;
    transition: color 0.3s ease;
    padding: 2px 5px;
    
    @media (max-width: 768px) {
      color: #1677ff;
      border-radius: 4px;
    }

    &:hover {
      color: #69b7ff;
    }

    &:active {
      color: #1677ff;
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
