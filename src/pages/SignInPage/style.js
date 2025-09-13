import styled from "styled-components";
import signInsignUp from '../../assets/images/signIn_signUp.png';


export const WrapperContainerLeft = styled.div`
    flex: 1;
    padding: 40px 45px 24px;
    display: flex;
    flex-direction: column;
    
    @media (max-width: 768px) {
        padding: 30px 25px 20px;
        width: 100%;
    }
    
    h1 {
        @media (max-width: 768px) {
            font-size: 22px;
            margin-bottom: 10px;
        }
    }
    
    p {
        @media (max-width: 768px) {
            font-size: 14px;
            margin-bottom: 15px;
        }
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
    
    @media (max-width: 768px) {
        display: none;
    }
`

export const WrapperTextLight = styled.span`
    color: #c57622;
    font-size: 13px;
    cursor: pointer;
    
    @media (max-width: 768px) {
        font-size: 12px;
    }
`

export const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.53);
  height: 100vh;
  position: relative;
`;

export const ReturnHomeButton = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #C68642;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  z-index: 10;
  
  &:hover {
    color: #D4A574;
  }

  @media (max-width: 768px) {
    top: 15px;
    left: 15px;
    font-size: 12px;
  }
`;

export const LoginContainer = styled.div`
  width: 800px;
  height: 450px;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  background-color: #333131;

  @media (max-width: 768px) {
    width: 90%;
    max-width: 400px;
    height: auto;
    min-height: 400px;
    flex-direction: column;
  }
`;

export const PasswordWrapper = styled.div`
  position: relative;
  
  @media (max-width: 768px) {
    margin-bottom: 5px;
  }
`;

export const PasswordIcon = styled.span`
  z-index: 10;
  position: absolute;
  color: #655e5e;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
  font-size: 14px;
  cursor: pointer;

  @media (max-width: 768px) {
    right: 10px;
  }
`;