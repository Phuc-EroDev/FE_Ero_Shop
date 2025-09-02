import React from 'react';

const FormattedTextComponent = ({ text, style, ...props }) => {
  return (
    <div
      style={{
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
        lineHeight: '1.6',
        ...style,
      }}
      {...props}
    >
      {text}
    </div>
  );
};

export default FormattedTextComponent;
