import styled from 'styled-components';

export const WrapperLabelText = styled.h4`
  font-weight: 500;
  font-size: 14px;
  color: #fdf6ec;
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
  
  @media (max-width: 576px) {
    font-size: 12px;
  }
`;

export const WrapperTextValue = styled.span`
  color: #fdf6ec;
  font-size: 12px;
  font-weight: 400;
  
  @media (max-width: 576px) {
    font-size: 11px;
  }
`;

export const WrapperContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  @media (max-width: 768px) {
    gap: 10px;
  }
  
  @media (max-width: 576px) {
    gap: 8px;
  }
`;

export const WrapperTextPrice = styled.div`
  border-radius: 10px;
  background-color: #423e3e;
  width: fit-content;
  padding: 4px;
  color: #fff;
  
  @media (max-width: 576px) {
    padding: 3px;
    font-size: 11px;
  }
`;

export const WrapperNavBar = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 10px 0;
  
  @media (max-width: 768px) {
    gap: 12px;
    flex-wrap: wrap;
  }
  
  @media (max-width: 576px) {
    gap: 8px;
    padding: 8px 0;
    overflow-x: auto;
    
    &::-webkit-scrollbar {
      height: 3px;
    }
    
    &::-webkit-scrollbar-thumb {
      background-color: #c68642;
      border-radius: 3px;
    }
    
    &::-webkit-scrollbar-track {
      background-color: #333333;
      border-radius: 3px;
    }
  }
`;

export const NavBarItem = styled.div`
  padding: 8px 12px;
  background-color: ${(props) => (props.active ? '#d29b63' : '#333333')};
  color: ${(props) => (props.active ? '#ffffff' : '#cccccc')};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  white-space: nowrap;
  
  &:hover {
    background-color: ${(props) => (props.active ? '#d29b63' : '#444444')};
  }
  
  @media (max-width: 768px) {
    padding: 6px 10px;
    font-size: 13px;
  }
  
  @media (max-width: 576px) {
    padding: 5px 8px;
    font-size: 12px;
    flex-shrink: 0;
  }
`;
