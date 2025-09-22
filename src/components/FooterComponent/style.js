import styled from 'styled-components';

export const FooterWrapper = styled.footer`
  background-color: #2c2c2c;
  color: #ffffff;
  padding: 40px 0 0 0;
  margin-top: auto;
  border-top: 2px solid #d29b63;
  
  @media (max-width: 768px) {
    padding: 30px 0 0 0;
  }
  
  @media (max-width: 576px) {
    padding: 20px 0 0 0;
  }
`;

export const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 40px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 30px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: 20px;
    text-align: center;
    padding: 0 16px;
  }
`;

export const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FooterTitle = styled.h3`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #ffffff;
  letter-spacing: 1px;
  
  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 12px;
  }
  
  @media (max-width: 576px) {
    font-size: 18px;
    margin-bottom: 10px;
  }
`;

export const FooterSubtitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #ffffff;
  
  @media (max-width: 576px) {
    font-size: 15px;
    margin-bottom: 12px;
  }
`;

export const FooterDescription = styled.p`
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 20px;
  color: #cccccc;
  
  @media (max-width: 576px) {
    font-size: 13px;
    margin-bottom: 16px;
  }
`;

export const FooterSocial = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: 768px) {
    gap: 10px;
  }

  @media (max-width: 576px) {
    justify-content: center;
  }
`;

export const SocialIcon = styled.div`
  font-size: 20px;
  color: #cccccc;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #1890ff;
  }
  
  @media (max-width: 576px) {
    font-size: 18px;
  }
`;

export const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const FooterLinkItem = styled.li`
  margin-bottom: 12px;
  
  @media (max-width: 576px) {
    margin-bottom: 10px;
  }
`;

export const FooterLink = styled.a`
  color: #cccccc;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease;
  cursor: pointer;

  &:hover {
    color: #ffffff;
  }
  
  @media (max-width: 576px) {
    font-size: 13px;
  }
`;

export const FooterContact = styled.div`
  font-size: 14px;
  line-height: 1.6;

  p {
    margin-bottom: 8px;
    color: #cccccc;
  }
  
  @media (max-width: 576px) {
    font-size: 13px;
    
    p {
      margin-bottom: 6px;
    }
  }
`;

export const FooterBottom = styled.div`
  border-top: 1px solid #444444;
  margin-top: 40px;
  padding: 20px 0;
  text-align: center;
  background-color: #1a1a1a;

  p {
    margin: 0;
    font-size: 14px;
    color: #999999;
  }
  
  @media (max-width: 768px) {
    margin-top: 30px;
    padding: 16px 0;
  }
  
  @media (max-width: 576px) {
    margin-top: 20px;
    padding: 12px 0;
    
    p {
      font-size: 12px;
    }
  }
`;