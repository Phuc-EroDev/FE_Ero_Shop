import React from 'react';
import { WrapperContent, WrapperLabelText, WrapperTextPrice, WrapperTextValue } from './style';
import { Checkbox, Col, Rate, Row } from 'antd';

const NavBarComponent = () => {
  const onChange = () => {};

  const renderContent = (type, options) => {
    switch (type) {
      case 'text':
        return options.map((option, index) => {
          return <WrapperTextValue key={index}>{option}</WrapperTextValue>;
        });
      case 'checkbox':
        return (
          <Checkbox.Group
            style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}
            onChange={onChange}
          >
            {options.map((option, index) => {
              return (
                <Checkbox key={index} value={option.value}>
                  {option.label}
                </Checkbox>
              );
            })}
          </Checkbox.Group>
        );
      case 'star':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {options.map((option, index) => {
              return (
                <div key={index} style={{ display: 'flex', gap: '10px' }}>
                  <Rate style={{ fontSize: '12px' }} disabled allowHalf defaultValue={option} />
                  <span>{`tu ${option} sao`}</span>
                </div>
              );
            })}
          </div>
        );
      case 'price':
        return options.map((option, index) => {
          return <WrapperTextPrice key={index}>{option}</WrapperTextPrice>;
        });
      default:
        return {};
    }
  };

  return (
    <div>
      <WrapperLabelText>Label</WrapperLabelText>
      <WrapperContent>{renderContent('text', ['Laptop', 'Phone', 'TV'])}</WrapperContent>
    </div>
  );
};

export default NavBarComponent;
