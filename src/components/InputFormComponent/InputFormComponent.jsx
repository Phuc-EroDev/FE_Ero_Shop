import { Input } from 'antd';
import React, { useState } from 'react';
import { WrapperInputStyle } from './style';

const InputFormComponent = ({ placeholder = 'Hay nhap truong nay !!!', ...rest }) => {
  const [valueInput, setValueInput] = useState('');
  return (
    <div>
      <WrapperInputStyle
        placeholder={placeholder}
        value={valueInput}
        {...rest}
        onChange={(e) => setValueInput(e.target.value)}
      />
    </div>
  );
};

export default InputFormComponent;
