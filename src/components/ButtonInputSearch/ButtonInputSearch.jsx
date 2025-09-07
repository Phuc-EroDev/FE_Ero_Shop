import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import InputComponent from '../InputComponent/InputComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import styled from 'styled-components';

const SearchContainer = styled.div`
  display: flex;
  width: 100%;
  
  @media (max-width: 576px) {
    flex-direction: ${props => props.responsiveDirection || 'row'};
    gap: ${props => props.responsiveGap || '0px'};
  }
`;

const ButtonInputSearch = (props) => {
  const {
    size,
    placeholder,
    textbutton,
    borderRadius = '0px',
    backgroundColorInput = '#ffffff',
    backgroundColorButton = '#C68642',
    colorButton = '#FDF6EC',
    responsiveDirection,
    responsiveGap,
  } = props;
  
  return (
    <SearchContainer responsiveDirection={responsiveDirection} responsiveGap={responsiveGap}>
      <InputComponent
        size={size}
        placeholder={placeholder}
        style={{ 
          backgroundColor: backgroundColorInput, 
          borderRadius: borderRadius,
          width: '100%'
        }}
        {...props}
      />
      <ButtonComponent
        size={size}
        style={{ 
          backgroundColor: backgroundColorButton, 
          borderRadius: borderRadius, 
          color: colorButton,
          minWidth: responsiveDirection === 'column' ? '100%' : 'auto'
        }}
        icon={<SearchOutlined />}
        textbutton={textbutton}
      />
    </SearchContainer>
  );
};

export default ButtonInputSearch;
