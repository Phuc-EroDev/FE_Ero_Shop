import React from 'react';
import { WrapperTypeList, WrapperTypeItem, WrapperTitle } from './style';
import { useResponsive } from '../../hooks/useResponsive';

const TypeListComponent = ({ typeProducts = [], selectedType, onTypeSelect }) => {
  const { isSmallMobile } = useResponsive();

  const handleItemClick = (type) => {
    onTypeSelect(type === selectedType ? '' : type);
  };

  return (
    <WrapperTypeList>
      <WrapperTitle>Danh mục</WrapperTitle>

      {/* All Products Option */}
      <WrapperTypeItem $isSelected={selectedType === ''} onClick={() => handleItemClick('')} $isSmallMobile={isSmallMobile}>
        Tất cả sản phẩm
      </WrapperTypeItem>

      {/* Type List */}
      {typeProducts.map((type, index) => (
        <WrapperTypeItem
          key={index}
          $isSelected={selectedType === type}
          onClick={() => handleItemClick(type)}
          $isSmallMobile={isSmallMobile}
        >
          {type}
        </WrapperTypeItem>
      ))}
    </WrapperTypeList>
  );
};

export default TypeListComponent;
