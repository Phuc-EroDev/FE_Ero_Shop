import styled from 'styled-components';

export const WrapperStyleHeader = styled.div`
  background-color: #2a2a2a;
  padding: 16px 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  span {
    color: #ffffff;
    font-size: 14px;
    font-weight: 500;
  }
`;

export const WrapperContainer = styled.div`
  width: 100%;
  background-color: #2a2a2a;
  border-radius: 8px;
  margin: 0 auto;
  padding: 20px;
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
`;

export const WrapperRight = styled.div`
  width: 23%;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
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

export const WrapperAddressInfo = styled.div`
  padding: 16px;
  background-color: #2a2a2a;
  border-radius: 8px;
  border: 1px solid #404040;
  margin-bottom: 16px;

  .address-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  .address-label {
    color: #cccccc;
    font-size: 14px;
    font-weight: 500;
  }

  .change-button {
    color: #4096ff;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    text-decoration: underline;
    transition: color 0.3s ease;

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

    &.placeholder {
      color: #888888;
      font-style: italic;
      font-weight: 400;
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
