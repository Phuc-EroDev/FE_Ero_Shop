import React from 'react';
import HeaderComponent from '../HeaderComponent/HeaderComponent';
import FooterComponent from '../FooterComponent/FooterComponent';

const DefaultComponent = ({ children }) => {
  return (
    <div>
      <HeaderComponent />
      <div style={{ paddingTop: '60px', minHeight: 'calc(100vh - 80px)' }}>{children}</div>
      <FooterComponent />
    </div>
  );
};

export default DefaultComponent;
