import styled from 'styled-components';

export const WrapperSearchResult = styled.div`
  width: 100%;
  padding: 20px 0;
  min-height: 400px;
  
  @media (max-width: 768px) {
    padding: 15px 0;
    min-height: 300px;
  }
  
  @media (max-width: 576px) {
    padding: 10px 0;
    min-height: 200px;
  }
`;

export const WrapperTitle = styled.h2`
  color: #D4A574;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  padding: 15px 10px;
  border-bottom: 2px solid #C68642;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  
  @media (max-width: 768px) {
    font-size: 20px;
    padding: 12px 8px;
    margin-bottom: 15px;
  }
  
  @media (max-width: 576px) {
    font-size: 18px;
    padding: 10px 5px;
    margin-bottom: 10px;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, #C68642, #D4A574);
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    font-size: 20px;
    padding: 15px 8px;
    margin-bottom: 20px;
    
    &::after {
      width: 80px;
      height: 3px;
    }
  }
  
  @media (max-width: 576px) {
    font-size: 18px;
    padding: 12px 5px;
    margin-bottom: 15px;
    
    &::after {
      width: 60px;
      height: 3px;
    }
  }
`;

export const WrapperProducts = styled.div`
  width: 100%;
  
  .ant-row {
    margin: 0;
  }
  
  .ant-col {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  
  .ant-empty {
    .ant-empty-description {
      color: #cccccc;
      font-size: 16px;
      padding: 0 15px;
      text-align: center;
      
      @media (max-width: 576px) {
        font-size: 14px;
        padding: 0 10px;
      }
    }
    
    @media (max-width: 576px) {
      margin: 8px 0;
    }
  }
  
  @media (max-width: 576px) {
    .ant-col {
      margin-bottom: 12px;
    }
  }
      
      @media (max-width: 576px) {
        font-size: 14px;
      }
    }
    
    .ant-empty-image {
      height: auto;
      
      @media (max-width: 576px) {
        transform: scale(0.8);
        margin-bottom: -10px;
      }
    }
  }
  
  @media (max-width: 576px) {
    .ant-col {
      margin-bottom: 15px;
    }
  }
`;

export const WrapperNoResult = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #cccccc;
  
  h3 {
    color: #999999;
    margin-bottom: 10px;
  }
  
  p {
    font-size: 14px;
    margin-bottom: 20px;
    color: #888888;
  }
  
  @media (max-width: 768px) {
    padding: 40px 15px;
    
    h3 {
      font-size: 18px;
    }
    
    p {
      font-size: 13px;
    }
  }
  
  @media (max-width: 576px) {
    padding: 30px 10px;
    
    h3 {
      font-size: 16px;
    }
    
    p {
      font-size: 12px;
    }
  }
`;
