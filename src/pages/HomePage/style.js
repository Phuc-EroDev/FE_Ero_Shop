import styled from 'styled-components';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';

// Container with responsive horizontal paddings
export const PageContainer = styled.div`
  margin: 0 auto;
  padding: 0 120px;

  @media (max-width: 1200px) {
    padding: 0 40px;
  }

  @media (max-width: 768px) {
    padding: 0 16px;
  }

  @media (max-width: 576px) {
    padding: 0 12px;
  }
`;

// Page background wrapper
export const BodyWrapper = styled.div`
  width: 100%;
  background-color: #333131;
`;

export const WrapperTypeProduct = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  justify-content: flex-start;
  height: 40px;
  
  @media (max-width: 768px) {
    height: 32px;
  }
  
  @media (max-width: 576px) {
    height: 28px;
  }
`;

export const WrapperButtonMore = styled(ButtonComponent)`
  color: #f8dfdfff;
  background-color: #d29b63;
  width: 120px;
  height: 38px;
  position: absolute;
  top: 0;
  left: 0;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  z-index: 2;

  &:hover {
    background-color: #a27344ff;
    span {
      color: #f8dfdfff;
    }
  }
  
  @media (max-width: 768px) {
    width: 100px;
    height: 34px;
    font-size: 14px;
    top: 10px;
    left: 10px;
  }
  
  @media (max-width: 576px) {
    width: 90px;
    height: 32px;
    font-size: 12px;
    top: 8px;
    left: 8px;
  }
`;

export const WrapperProducts = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 20px;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 12px;
    margin-top: 16px;
    justify-content: space-between;
  }
  
  @media (max-width: 576px) {
    gap: 10px;
  }
`;
