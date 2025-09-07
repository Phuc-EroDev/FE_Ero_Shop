import React from 'react';
import HeaderComponent from '../HeaderComponent/HeaderComponent';
import FooterComponent from '../FooterComponent/FooterComponent';
import styled from 'styled-components';

const MainContainer = styled.div`
  padding-top: 60px;
  min-height: calc(100vh - 80px);
  
  @media (max-width: 768px) {
    padding-top: 56px;
  }
  
  @media (max-width: 576px) {
    padding-top: 52px;
    padding-left: 12px;
    padding-right: 12px;
  }
`;

const DefaultComponent = ({ children }) => {
  return (
    <div>
      <HeaderComponent />
      <MainContainer>{children}</MainContainer>
      <FooterComponent />
    </div>
  );
};

export default DefaultComponent;
