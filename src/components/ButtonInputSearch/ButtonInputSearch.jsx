import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import InputComponent from '../InputComponent/InputComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

const ButtonInputSearch = (props) => {
  const {
    size,
    placeholder,
    textbutton,
    borderRadius = '0px',
    backgroundColorInput = '#ffffff',
    backgroundColorButton = '#C68642',
    colorButton = '#FDF6EC',
  } = props;
  return (
    <div style={{ display: 'flex' }}>
      <InputComponent
        size={size}
        placeholder={placeholder}
        style={{ backgroundColor: backgroundColorInput, borderRadius: borderRadius }}
        {...props}
      />
      <ButtonComponent
        size={size}
        style={{ backgroundColor: backgroundColorButton, borderRadius: borderRadius, color: colorButton }}
        icon={<SearchOutlined />}
        textbutton={textbutton}
      />
    </div>
  );
};

export default ButtonInputSearch;
