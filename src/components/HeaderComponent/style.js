import { Row } from 'antd';
import styled from 'styled-components';

export const WrapperHeader = styled(Row)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 10px 120px;
  background-color: #d29b63;
  align-items: center;
  gap: 16px;
  flex-wrap: nowrap;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    padding: 10px 20px;
    gap: 12px;
  }
  
  @media (max-width: 576px) {
    padding: 8px 12px;
    gap: 8px;
  }
`;

export const WrapperTextHeader = styled.span`
  font-size: 18px;
  color: #fdf6ec;
  font-weight: bold;
  text-align: left;
  cursor: pointer;
  
  @media (max-width: 576px) {
    font-size: 16px;
  }
`;

export const WrapperHeaderAccount = styled.div`
  display: flex;
  align-items: center;
  color: #fdf6ec;
  gap: 10px;
  
  @media (max-width: 576px) {
    gap: 6px;
  }
`;

export const WrapperTextHeaderSmall = styled.span`
  color: #fdf6ec;
  font-size: 12px;
  cursor: pointer;
  
  @media (max-width: 576px) {
    font-size: 10px;
  }
`;

export const WrapperContentPopup = styled.p`
  cursor: pointer;
  &:hover {
    color: #d29b63;
  }
`;
