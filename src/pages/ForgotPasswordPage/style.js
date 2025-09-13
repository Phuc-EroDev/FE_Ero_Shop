import styled from "styled-components";
import signInsignUp from '../../assets/images/signIn_signUp.png';


export const WrapperContainerLeft = styled.div`
    flex: 1;
    padding: 40px 45px 24px;
    display: flex;
    flex-direction: column;
    
    @media (max-width: 768px) {
        padding: 20px 25px 15px;
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

export const ForgotPasswordContainer = styled.div`
  width: 800px;
  height: 500px;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  background-color: #333131;

  @media (max-width: 768px) {
    width: 90%;
    max-width: 400px;
    height: auto;
    min-height: 480px;
    flex-direction: column;
  }
`;

export const PasswordWrapper = styled.div`
  position: relative;
  margin-bottom: 10px;
  
  @media (max-width: 768px) {
    margin-bottom: 10px;
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
    font-size: 12px;
  }
`;

export const EmailWrapper = styled.div`
  position: relative;
  margin-bottom: 10px;
  
  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

export const OtpButton = styled.span`
  z-index: 10;
  position: absolute;
  color: #C68642;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
  font-size: 12px;
  cursor: pointer;
  padding: 6px 8px;
  background-color: #fff;
  border-left: 1px solid #C68642;
  
  @media (max-width: 768px) {
    font-size: 11px;
    padding: 5px 6px;
  }
`;

export const OtpWrapper = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const ButtonWrapper = styled.div`
  margin: 26px 0 10px;
  
  @media (max-width: 768px) {
    margin: 20px 0 8px;
  }
`;

export const ResetPasswordButton = styled.div`
  background-color: ${props => props.disabled ? '#ccc' : '#C68642'};
  border-radius: 4px;
  color: #FDF6EC;
  font-weight: 600;
  width: 100%;
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const OtpSuccessMessage = styled.span`
  width: 100%;
  margin-left: 15px;
  font-size: 12px;
  color: #C68642;
  
  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 5px;
    font-size: 11px;
  }
`;
