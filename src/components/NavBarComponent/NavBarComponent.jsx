import React, { useState } from 'react';
import { NavBarItem, WrapperContent, WrapperLabelText, WrapperNavBar, WrapperTextPrice, WrapperTextValue } from './style';
import { Checkbox, Col, Rate, Row } from 'antd';

const NavBarComponent = ({ categories = [] }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const onChange = () => {};

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

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
      {categories && categories.length > 0 && (
        <WrapperNavBar>
          {categories.map((category, index) => (
            <NavBarItem 
              key={index}
              active={activeCategory === category}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </NavBarItem>
          ))}
        </WrapperNavBar>
      )}
      <WrapperLabelText>Label</WrapperLabelText>
      <WrapperContent>{renderContent('text', ['Laptop', 'Phone', 'TV'])}</WrapperContent>
    </div>
  );
};

export default NavBarComponent;
