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
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }

    .ant-card-body {
        padding: 10px;
        background-color: #dfdedd;
    }
    
    .ant-card-cover {
        position: relative;
    }
    
    @media (max-width: 768px) {
      width: 180px;
      height: 270px;
      & img {
        width: 180px;
        height: 180px;
      }
    }
    
    @media (max-width: 576px) {
      width: 100%;
      height: auto;
      & img {
        width: 100%;
        height: auto;
        aspect-ratio: 1/1;
        object-fit: cover;
      }
    }
`;

export const StyleNameProduct = styled.div`
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  color: #171414;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  
  @media (max-width: 576px) {
    font-size: 14px;
    line-height: 18px;
  }
`;

export const WrapperReportText = styled.div`
  font-size: 10px;
  color: #171414;
  display: flex;
  align-items: center;
  margin-top: 6px;
  
  @media (max-width: 576px) {
    font-size: 12px;
    flex-wrap: wrap;
  }
`;

export const WrapperPriceText = styled.div`
  color: #e53030;
  font-size: 16px;
  font-weight: 500;
  
  @media (max-width: 576px) {
    font-size: 18px;
    margin-top: 4px;
  }
`;

export const WrapperDiscountText = styled.span`
  color: #f54141;
  font-size: 12px;
  font-weight: 500;
  
  @media (max-width: 576px) {
    font-size: 14px;
  }
`;

export const WrapperStyleTextSell = styled.span`
  font-size: 15px;
  line-height: 24px;
  color: #959392;
  
  @media (max-width: 576px) {
    font-size: 12px;
    line-height: 16px;
  }
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
