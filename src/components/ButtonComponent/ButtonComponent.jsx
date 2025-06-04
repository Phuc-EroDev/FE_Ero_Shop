import React from 'react';
import { Button } from 'antd';

const ButtonComponent = ({ size, textbutton, icon = null, style, ...rests }) => {
  return (
    <Button size={size} style={style} icon={icon} {...rests}>
      {textbutton}
    </Button>
  );
};

export default ButtonComponent;
