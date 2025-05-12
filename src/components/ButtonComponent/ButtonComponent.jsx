import React from 'react';
import { Button } from 'antd';

const ButtonComponent = ({ size, textButton, icon = null, style, ...rests }) => {
  return (
    <Button size={size} style={style} icon={icon} {...rests}>
      {textButton}
    </Button>
  );
};

export default ButtonComponent;
