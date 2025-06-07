import { Col } from "antd";
import styled from "styled-components";

export const WrapperContainer = styled.div`
    background-color: #333131;
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
`;

export const WrapperProducts = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Responsive grid */
    gap: 16px;
    margin-top: 0;
    width: 100%;
    
    /* Responsive breakpoints */
    @media (min-width: 1400px) {
        grid-template-columns: repeat(5, 1fr); /* 5 card trên màn hình lớn */
    }
    
    @media (max-width: 1399px) and (min-width: 1200px) {
        grid-template-columns: repeat(4, 1fr); /* 4 card trên màn hình vừa */
    }
    
    @media (max-width: 1199px) and (min-width: 992px) {
        grid-template-columns: repeat(3, 1fr); /* 3 card trên màn hình nhỏ */
    }
    
    @media (max-width: 991px) and (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr); /* 2 card trên tablet */
    }
    
    @media (max-width: 767px) {
        grid-template-columns: 1fr; /* 1 card trên mobile */
    }
`;

export const WrapperNavbar = styled(Col)`
    background-color: #242424;
    padding: 20px;
    border-radius: 8px;
    height: 100vh;
    margin-top: 0;
    
    /* Responsive cho NavBar */
    @media (max-width: 768px) {
        margin-bottom: 20px;
    }
`;