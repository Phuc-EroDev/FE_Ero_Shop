import styled from "styled-components";
import signInsignUp from '../../assets/images/signIn_signUp.png';


export const WrapperContainerLeft = styled.div`
    flex: 1;
    padding: 40px 45px 24px;
    display: flex;
    flex-direction: column;
    
    @media (max-width: 768px) {
        padding: 30px 25px 20px;
    }
    
    @media (max-width: 576px) {
        padding: 20px 15px 16px;
    }
`

export const WrapperContainerRight = styled.div`
    background-image: linear-gradient(0,rgba(255, 255, 255, 0.5), rgba(0, 0, 0, 0.25)), url(${signInsignUp});
    background-size: cover;
    background-repeat: no-repeat;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    width: 300px;
    height: auto;
    position: relative;
    
    @media (max-width: 992px) {
        width: 250px;
    }
    
    @media (max-width: 768px) {
        display: none;
    }
`

export const TextWelcomeShop = styled.h4`
    background: linear-gradient(
      to bottom, 
      rgba(255, 255, 255, 0), 
      rgba(255, 255, 255, 0.8), 
      rgba(255, 255, 255, 0)) !important;
    color: #c57622 !important;
    font-size: 18px;
    position: absolute;
    bottom: 85px;
    left: 60px;
    
    @media (max-width: 992px) {
        font-size: 16px;
        bottom: 75px;
        left: 40px;
    }
`

export const WrapperTextLight = styled.span`
    color: #c57622;
    font-size: 13px;
    cursor: pointer;
    
    @media (max-width: 576px) {
        font-size: 12px;
    }
`