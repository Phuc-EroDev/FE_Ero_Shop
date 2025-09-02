import { Col, InputNumber } from 'antd';
import styled from 'styled-components';

export const WrapperStyleImageSmall = styled.div`
  width: 100%;
  height: 80px;
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.05);

  &:hover {
    border-color: #c68642;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(198, 134, 66, 0.3);
  }

  &.active {
    border-color: #c68642;
    box-shadow: 0 0 0 1px rgba(198, 134, 66, 0.5);
    background: rgba(198, 134, 66, 0.1);
  }

  .ant-image {
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
  }

  &:hover .ant-image img {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    height: 60px;
  }

  @media (max-width: 576px) {
    height: 50px;
  }
`;

export const WrapperStyleColImage = styled(Col)`
  flex-basis: unset;
  display: flex;
`;

export const WrapperStyleNameProduct = styled.h1`
  color: #fdf6ec;
  font-size: clamp(20px, 4vw, 28px);
  font-weight: 600;
  line-height: 1.3;
  word-break: break-word;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    margin-bottom: 12px;
  }

  @media (max-width: 576px) {
    margin-bottom: 10px;
  }
`;

export const WrapperStyleTextSell = styled.span`
  font-size: clamp(13px, 2vw, 15px);
  line-height: 1.5;
  color: #959392;

  @media (max-width: 576px) {
    display: block;
    margin-top: 4px;
  }
`;

export const WrapperPriceProduct = styled.div`
  background-color: #3b3a38;
  border-radius: 8px;
  margin: 20px 0;

  @media (max-width: 768px) {
    margin: 16px 0;
  }

  @media (max-width: 576px) {
    margin: 12px 0;
  }
`;

export const WrapperPriceTextProduct = styled.h1`
  font-size: clamp(24px, 5vw, 32px);
  line-height: 1.2;
  margin: 0;
  padding: 16px 20px;
  font-weight: 600;
  color: #fdf6ec;

  @media (max-width: 768px) {
    padding: 14px 16px;
  }

  @media (max-width: 576px) {
    padding: 12px 14px;
  }
`;

export const WrapperAddressProduct = styled.div`
  span.address {
    text-decoration: underline;
    font-size: clamp(13px, 2vw, 15px);
    line-height: 1.5;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #cccccc;
  }
  span.change-address {
    font-size: clamp(14px, 2.5vw, 16px);
    line-height: 1.5;
    font-weight: 500;
    color: #d79334;
    cursor: pointer;

    &:hover {
      color: #e6a547;
    }
  }
`;

/* New responsive wrappers */
export const WrapperMainContainer = styled.div`
  padding: 16px;
  background-color: #272727;
  border-radius: 8px;
  max-width: 100%;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 12px;
  }

  @media (max-width: 576px) {
    padding: 8px;
  }
`;

export const WrapperMainImage = styled.div`
  width: 100%;
  max-width: 502px;
  height: 450px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #3b3a38;

  .ant-image {
    width: 100%;
    height: 100%;
    border-radius: 8px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  @media (max-width: 768px) {
    max-width: 100%;
    height: 350px;
  }

  @media (max-width: 576px) {
    height: 280px;
  }
`;

export const WrapperImageCol = styled(Col)`
  padding-right: 16px;
  border-right: 1px solid #3b3a38;

  @media (max-width: 768px) {
    padding-right: 0;
    border-right: none;
    border-bottom: 1px solid #3b3a38;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }
`;

export const WrapperInfoCol = styled(Col)`
  padding-left: 16px;

  @media (max-width: 768px) {
    padding-left: 0;
  }
`;

export const WrapperQuantitySection = styled.div`
  margin: 16px 0 24px;
  padding: 12px 0;
  border-top: 1px solid #3b3a38;
  border-bottom: 1px solid #3b3a38;

  .quantity-label {
    margin-bottom: 12px;
    color: #fdf6ec;
    font-weight: 600;
    font-size: clamp(16px, 2.5vw, 18px);
    letter-spacing: 0.5px;
    display: flex;
    align-items: center;
    gap: 8px;

    &::after {
      content: '';
      flex: 1;
      height: 1px;
      background: linear-gradient(90deg, #c68642, transparent);
    }
  }

  @media (max-width: 576px) {
    margin: 20px 0;
    padding: 16px;
  }
`;

export const WrapperButtonSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;

  .ant-btn {
    flex: 1;
    min-width: 180px;
    height: 44px;
    border-radius: 4px;
    font-weight: 600;
    font-size: clamp(14px, 2vw, 16px);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-1px);
    }
  }

  @media (max-width: 768px) {
    gap: 10px;

    .ant-btn {
      min-width: 160px;
      height: 40px;
    }
  }

  @media (max-width: 576px) {
    flex-direction: column;
    gap: 8px;

    .ant-btn {
      width: 100%;
      min-width: 100%;
      height: 44px;
    }
  }
`;

export const WrapperErrorMessage = styled.div`
  color: #ff6b6b;
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid rgba(255, 107, 107, 0.3);
  border-radius: 4px;
  padding: 8px 12px;
  margin-top: 12px;
  font-size: clamp(13px, 2vw, 14px);
  line-height: 1.4;
`;

/* Comment section styling */
export const WrapperCommentContainer = styled.div`
  margin-top: 24px;
  border-top: 2px solid #3b3a38;

  .fb-comments {
    width: 100% !important;
  }

  @media (max-width: 768px) {
    margin-top: 20px;
    padding-top: 20px;
  }

  @media (max-width: 576px) {
    margin-top: 16px;
    padding-top: 16px;
  }
`;

export const WrapperQualityProduct = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;

  @media (max-width: 576px) {
    gap: 6px;
  }
`;

export const WrapperInputNumber = styled(InputNumber)`
  width: clamp(50px, 8vw, 80px);
  height: 32px;
  border-radius: 8px;
  border: 1px solid #404040;

  .ant-input-number-handler-wrap {
    display: none;
  }

  .ant-input-number-input {
    text-align: center;
    background: #404040;
    border: 1px solid #404040;
    color: #fdf6ec;
    font-weight: 500;

    &:focus {
      border-color: #c68642;
      background: #2a2a2a;
    }

    &:hover {
      border-color: #c68642;
      background: #2a2a2a;
    }
  }

  @media (max-width: 576px) {
    height: 28px;
  }
`;
