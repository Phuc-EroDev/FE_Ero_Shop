import React from 'react';
import { List } from 'antd';
import { WrapperTypeList, WrapperTypeItem, WrapperTitle } from './style';

const TypeListComponent = ({ typeProducts = [], selectedType, onTypeSelect }) => {
  const handleItemClick = (type) => {
    onTypeSelect(type === selectedType ? '' : type);
  };

  return (
    <WrapperTypeList>
      <WrapperTitle>Danh mục</WrapperTitle>

      {/* All Products Option */}
      <WrapperTypeItem $isSelected={selectedType === ''} onClick={() => handleItemClick('')}>
        Tất cả sản phẩm
      </WrapperTypeItem>

      {/* Type List */}
      {typeProducts.map((type, index) => (
        <WrapperTypeItem key={index} $isSelected={selectedType === type} onClick={() => handleItemClick(type)}>
          {type}
        </WrapperTypeItem>
      ))}
    </WrapperTypeList>
  );
};

export default TypeListComponent;
