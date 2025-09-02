import { Card } from 'antd';
import styled from 'styled-components';

export const WrapperCardStyle = styled(Card)`
    width: 200px;
    height: 291px;
    & img {
      width: 200px;
      height: 200px;
    },
    position: relative;
    cursor: pointer;
    opacity: ${(props) => (props.disabled ? '0.4' : '1')};

    .ant-card-body {
        padding: 10px;
        background-color: #dfdedd;
    }
    
    .ant-card-cover {
        position: relative;
    }
`;

export const StyleNameProduct = styled.div`
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  color: #171414;
`;

export const WrapperReportText = styled.div`
  font-size: 10px;
  color: #171414;
  display: flex;
  align-items: center;
  margin-top: 6px;
`;

export const WrapperPriceText = styled.div`
  color: #e53030;
  font-size: 16px;
  font-weight: 500;
`;

export const WrapperDiscountText = styled.span`
  color: #f54141;
  font-size: 12px;
  font-weight: 500;
`;

export const WrapperStyleTextSell = styled.span`
  font-size: 15px;
  line-height: 24px;
  color: #959392;
`;

export const WrapperOutOfStockLabel = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  z-index: 10;
  white-space: nowrap;
  backdrop-filter: blur(4px);
  border: 1px solid #ff4444;
  box-shadow: 0 4px 12px rgba(255, 68, 68, 0.3);
`;
