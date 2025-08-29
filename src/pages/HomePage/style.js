import styled from 'styled-components';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';

export const WrapperTypeProduct = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  justify-content: flex-start;
  height: 44px;
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
`;

export const WrapperProducts = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 20px;
  flex-wrap: wrap;
`;
