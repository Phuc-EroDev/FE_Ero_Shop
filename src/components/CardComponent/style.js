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
    border-radius: 8px;
    overflow: hidden;

    .ant-card-body {
        padding: 10px;
        background-color: #dfdedd;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
    }
    
    .ant-card-cover {
        position: relative;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        overflow: hidden;
        line-height: 0;
    }
    
    .mall-badge {
        width: 25px;
        height: 18px;
        position: absolute;
        top: 5px;
        left: -3px;
        z-index: 1;
    }
    
    /* Responsive styles */
    @media (max-width: 768px) {
        width: 180px;
        height: 259px;
        
        & img {
            width: 180px;
            height: 180px;
        }
        
        .mall-badge {
            width: 25px;
            height: 16px;
        }
        
        .ant-card-body {
            padding: 8px 10px;
        }
    }
    
    @media (max-width: 576px) {
        width: 160px;
        height: 228px;
        
        & img {
            width: 160px;
            height: 160px;
        }
        
        .ant-card-body {
            padding: 6px 8px;
        }
        
        .mall-badge {
            width: 25px;
            height: 15px;
        }
    }
    
    @media (max-width: 400px) {
        width: 140px;
        height: 203px;
        
        & img {
            width: 140px;
            height: 140px;
        }
        
        .mall-badge {
            width: 23px;
            height: 14px;
            top: 5px;
        }
    }
`;

export const StyleNameProduct = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  color: #171414;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-bottom: 1px;
  
  @media (max-width: 768px) {
    font-size: 11px;
    line-height: 15px;
    -webkit-line-clamp: 2;
    margin-bottom: 1px;
  }
  
  @media (max-width: 576px) {
    font-size: 12px;
    line-height: 14px;
    -webkit-line-clamp: 2;
    margin-bottom: 0;
  }
  
  @media (max-width: 400px) {
    font-size: 11px;
    line-height: 13px;
  }
`;

export const WrapperReportText = styled.div`
  font-size: 10px;
  color: #171414;
  display: flex;
  align-items: center;
  margin-top: 6px;
  
  .star-icon {
    font-size: 12px;
    color: yellow;
    
    @media (max-width: 576px) {
      font-size: 10px;
    }
    
    @media (max-width: 400px) {
      font-size: 9px;
    }
  }
  
  @media (max-width: 768px) {
    font-size: 9px;
    margin-top: 5px;
  }
  
  @media (max-width: 576px) {
    font-size: 9px;
    margin-top: 4px;
  }
  
  @media (max-width: 400px) {
    font-size: 8px;
    margin-top: 3px;
  }
`;

export const WrapperPriceText = styled.div`
  color: #e53030;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  width: 100%;
  margin-top: 2px;
  
  span:first-child {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 75%;
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
    margin-top: 1px;
  }
  
  @media (max-width: 576px) {
    font-size: 13px;
    margin-top: 1px;
  }
  
  @media (max-width: 400px) {
    font-size: 12px;
    margin-top: 0;
  }
`;

export const WrapperDiscountText = styled.span`
  color: #f54141;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  flex-shrink: 0;
  margin-left: 4px;
  text-align: right;
  min-width: 32px;
  
  @media (max-width: 576px) {
    font-size: 10px;
    min-width: 28px;
  }
  
  @media (max-width: 400px) {
    font-size: 9px;
    min-width: 24px;
  }
`;

export const WrapperStyleTextSell = styled.span`
  font-size: 15px;
  line-height: 24px;
  color: #959392;
  
  @media (max-width: 768px) {
    font-size: 12px;
    line-height: 20px;
  }
  
  @media (max-width: 576px) {
    font-size: 10px;
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
  padding: 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  z-index: 10;
  white-space: nowrap;
  backdrop-filter: blur(4px);
  border: 1px solid #ff4444;
  box-shadow: 0 4px 12px rgba(255, 68, 68, 0.3);
  
  @media (max-width: 768px) {
    font-size: 12px;
    padding: 12px;
  }
  
  @media (max-width: 576px) {
    font-size: 10px;
    padding: 10px;
    border-radius: 4px;
  }
`;
