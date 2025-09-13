import styled from 'styled-components';

export const WrapperContainer = styled.div`
  width: 100%;
  background-color: #2a2a2a;
  min-height: 100vh;
  padding: 20px 0;

  @media (max-width: 576px) {
    margin-top: -8px;
  }
`;

export const WrapperNavbar = styled.div`
  background-color: #333333;
  margin-right: 20px;
  padding: 0;
  border-radius: 12px;
  height: auto;
  width: 220px;
  min-height: calc(100vh - 150px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  border: 1px solid #444444;
  overflow: hidden;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 20px;
    min-height: auto;
    width: 100%;
  }
  
  @media (max-width: 576px) {
    margin-bottom: 15px;
  }
`;

export const WrapperProducts = styled.div`
  background-color: #333333;
  border-radius: 12px;
  padding: 14px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  min-height: calc(100vh - 150px);
  border: 1px solid #444444;

  .ant-row {
    margin: 0;
  }

  .ant-col {
    display: flex;
    justify-content: center;
    margin-bottom: 24px;
  }

  @media (max-width: 768px) {
    padding: 20px 15px;
    min-height: auto;
    
    .ant-col {
      padding: 0 8px;
    }
  }

  @media (max-width: 576px) {
    padding: 12px 8px;
    
    .ant-col {
      padding: 0 4px;
      margin-bottom: 16px;
    }
  }
`;

export const WrapperContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 0 15px;
  }

  @media (max-width: 576px) {
    padding: 0 10px;
  }
  
  /* Add styling for mobile drawer button */
  .mobile-category-button {
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .ant-drawer-body {
    padding: 0;
    background-color: #333333;
  }

  .ant-drawer-header {
    background-color: #2a2a2a;
    border-bottom: 1px solid #444;
    
    .ant-drawer-title {
      color: #D4A574;
      font-weight: 600;
    }
    
    .ant-drawer-close {
      color: #D4A574;
      &:hover {
        color: #fff;
      }
    }
  }
`;
