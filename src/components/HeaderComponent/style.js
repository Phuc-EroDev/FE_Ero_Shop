import { Row } from 'antd';
import styled from 'styled-components';

export const WrapperHeader = styled(Row)`
  padding: 10px 120px;
  background-color: #d29b63;
  align-items: center;
  gap: 16px;
  flex-wrap: nowrap;
`;
export const WrapperTextHeader = styled.span`
  font-size: 18px;
  color: #fdf6ec;
  font-weight: bold;
  text-align: left;
  cursor: pointer;
`;
export const WrapperHeaderAccount = styled.div`
  display: flex;
  align-items: center;
  color: #fdf6ec;
  gap: 10px;
`;
export const WrapperTextHeaderSmall = styled.span`
  color: #fdf6ec;
  font-size: 12px;
  cursor: pointer;
`;
export const WrapperContentPopup = styled.p`
  cursor: pointer;
  &:hover {
    color: #d29b63;
  }
`;
