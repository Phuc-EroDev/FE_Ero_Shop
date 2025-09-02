import { Menu } from 'antd';
import styled from 'styled-components';

export const WrapperMenu = styled(Menu)`
  position: fixed;
  width: 256px;
  height: calc(100vh - 64px);
  box-shadow: 1px 1px 2px #0b0909 !important;
  background: #1d1d1d;
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
`;
