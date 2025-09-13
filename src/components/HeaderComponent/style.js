import { Row } from 'antd';
import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @media (max-width: 768px) {
    body {
      overflow-x: hidden;
    }
  }
`;

export const WrapperHeader = styled(Row)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: #d29b63;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 0;
  
  padding-left: 120px;
  padding-right: 120px;
  
  align-items: center;
  gap: 16px;
  flex-wrap: nowrap;
  
  @media (max-width: 1200px) {
    padding-left: 40px;
    padding-right: 40px;
  }

  @media (max-width: 992px) {
    padding-left: 40px;
    padding-right: 40px;
  }

  @media (max-width: 768px) {
    padding-left: 16px;
    padding-right: 16px;
    gap: 8px;
    justify-content: space-between;
    width: 100%;
    max-width: 100%;
  }
  
  @media (max-width: 576px) {
    padding-left: 12px;
    padding-right: 12px;
  }
`;
export const WrapperTextHeader = styled.span`
  font-size: 18px;
  color: #fdf6ec;
  font-weight: bold;
  text-align: left;
  cursor: pointer;
  white-space: nowrap;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;
export const WrapperHeaderAccount = styled.div`
  display: flex;
  align-items: center;
  color: #fdf6ec;
  gap: 10px;
  
  img {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    object-fit: cover;
  }
  
  @media (max-width: 768px) {
    padding-right: 14px;
    gap: 8px;
    img { height: 28px; width: 28px; }
    justify-content: flex-end;
  }
`;
export const WrapperTextHeaderSmall = styled.span`
  color: #fdf6ec;
  font-size: 12px;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: none;
  }
`;
export const WrapperContentPopup = styled.p`
  cursor: pointer;
  white-space: nowrap;
  &:hover {
    color: #d29b63;
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 18px;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media (max-width: 992px) {
    gap: 14px;
  }
  @media (max-width: 768px) {
    gap: 10px;
    padding-right: 0;
    justify-content: flex-end;
  }
`;

export const UserNameText = styled.div`
  max-width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #fdf6ec;

  @media (max-width: 992px) {
    max-width: 120px;
  }
  @media (max-width: 768px) {
    display: none; /* hide on mobile */
  }
`;

export const CartLabel = styled.span`
  color: #fdf6ec;
  @media (max-width: 768px) {
    display: none; /* hide text label on mobile */
  }
`;

export const MenuIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  
  @media (min-width: 768px) {
    display: none;
  }
`;