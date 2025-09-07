import { Menu } from 'antd';
import styled from 'styled-components';

export const WrapperMenu = styled(Menu)`
  position: fixed;
  width: 256px;
  height: calc(100vh - 64px);
  box-shadow: 1px 1px 2px #0b0909 !important;
  background: #1d1d1d;
  z-index: 100;
  
  && .ant-menu-item {
    color: #d8d8d8;
  }
  
  && .ant-menu-item-selected {
    background-color: #d29b63;
  }
  
  && .ant-menu-item:hover {
    color: #d29b63 !important;
  }
  
  && .ant-menu-item-selected:hover {
    color: #ffffff !important;
  }
  
  @media (max-width: 992px) {
    width: 220px;
  }
  
  @media (max-width: 768px) {
    width: 180px;
  }
  
  @media (max-width: 576px) {
    width: 100%;
    position: relative;
    height: auto;
    margin-bottom: 16px;
  }
`;

export const WrapperAdminContainer = styled.div`
  position: relative;
  display: flex;
  margin-top: 60px;
  flex-direction: row;
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

export const WrapperAdminContent = styled.div`
  flex: 1;
  padding: 16px;
  margin-left: 256px;
  min-height: calc(100vh - 64px);
  
  @media (max-width: 992px) {
    margin-left: 220px;
  }
  
  @media (max-width: 768px) {
    margin-left: 180px;
    padding: 12px;
  }
  
  @media (max-width: 576px) {
    margin-left: 0;
    padding: 10px;
  }
`;

export const WrapperAdminTable = styled.div`
  .ant-table-wrapper {
    overflow-x: auto;
  }
  
  .ant-table-tbody > tr > td {
    padding: 12px 16px;
    
    @media (max-width: 768px) {
      padding: 10px 12px;
    }
    
    @media (max-width: 576px) {
      padding: 8px 10px;
    }
  }
  
  .ant-table-tbody > tr > td .ant-image {
    width: 60px;
    height: 60px;
    
    @media (max-width: 768px) {
      width: 50px;
      height: 50px;
    }
    
    @media (max-width: 576px) {
      width: 40px;
      height: 40px;
    }
  }
  
  .ant-table-thead > tr > th {
    @media (max-width: 768px) {
      padding: 10px 12px;
    }
    
    @media (max-width: 576px) {
      padding: 8px 10px;
    }
  }
`;

export const WrapperDashboardStats = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: 12px;
    margin-bottom: 16px;
  }
  
  .stat-card {
    background-color: #2a2a2a;
    border-radius: 8px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    
    .stat-title {
      font-size: 14px;
      color: #cccccc;
      margin-bottom: 8px;
    }
    
    .stat-value {
      font-size: 24px;
      font-weight: 600;
      color: #ffffff;
    }
    
    .stat-icon {
      font-size: 28px;
      margin-bottom: 12px;
      color: #d29b63;
    }
    
    @media (max-width: 768px) {
      padding: 12px;
      
      .stat-value {
        font-size: 20px;
      }
      
      .stat-icon {
        font-size: 24px;
        margin-bottom: 8px;
      }
    }
  }
`;

export const WrapperChartContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
  
  .chart-card {
    background-color: #2a2a2a;
    border-radius: 8px;
    padding: 16px;
    
    .chart-title {
      font-size: 16px;
      font-weight: 600;
      color: #ffffff;
      margin-bottom: 16px;
    }
    
    @media (max-width: 768px) {
      padding: 12px;
      
      .chart-title {
        font-size: 15px;
        margin-bottom: 12px;
      }
    }
  }
`;
