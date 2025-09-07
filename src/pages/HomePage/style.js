import styled from 'styled-components';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';

export const WrapperTypeProduct = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  justify-content: flex-start;
  height: 44px;
  overflow-x: auto;
  padding-bottom: 8px;
  
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  
  @media (max-width: 768px) {
    gap: 16px;
    height: 40px;
  }
  
  @media (max-width: 576px) {
    gap: 12px;
    height: 36px;
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
  }
  
  @media (max-width: 576px) {
    width: 90px;
    height: 32px;
    font-size: 12px;
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
    margin-top: 12px;
  }
`;
