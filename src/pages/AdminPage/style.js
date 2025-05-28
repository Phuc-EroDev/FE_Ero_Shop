import { Menu } from "antd";
import styled from "styled-components";

export const WrapperMenu = styled(Menu)`
    width: 256px;
    height: 100vh;
    box-shadow: 1px 1px 2px #0b0909 !important;
    background: #1d1d1d;
    && .ant-menu-item {
        color: #d8d8d8;
    }
    && .ant-menu-item-selected {
        background-color: #D29B63;
    }
    && .ant-menu-item:hover {
        color: #D29B63 !important;
    }
    && .ant-menu-item-selected:hover {
        color: #ffffff !important;
    }
`