import React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

const InputTextAreaComponent = ({ size, placeholder, style, rows = 4, autoSize, ...rests }) => {
  return (
    <TextArea 
      size={size} 
      placeholder={placeholder} 
      style={style} 
      rows={rows}
      autoSize={autoSize}
      {...rests} 
    />
  );
};

export default InputTextAreaComponent;
