import React from 'react';
import { WrapperInputStyle } from './style';

const InputFormComponent = (props) => {
  const { placeholder = 'Nhập trường này !', handleOnChange, ...rest } = props;
  const handleOnChangeInput = (e) => {
    handleOnChange(e.target.value);
  };
  return (
    <div>
      <WrapperInputStyle value={props.value} placeholder={placeholder} {...rest} onChange={handleOnChangeInput} />
    </div>
  );
};

export default InputFormComponent;
