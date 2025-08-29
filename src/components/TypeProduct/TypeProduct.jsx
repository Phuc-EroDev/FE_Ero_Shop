import React from 'react';
import { useNavigate } from 'react-router-dom';
import { productConstants } from '../../constant';
import {
  TypeProductContainer,
  TypeProductWrapper,
  SectionTitle,
  TypeProductGrid,
  TypeProductItem,
  TypeProductImage,
  TypeProductName,
} from './style';

const TypeProduct = ({ data }) => {
  const navigate = useNavigate();

  const handleNavigateType = (type) => {
    navigate(`/type-product/`, { state: { type } });

    // navigate(
    //   `/product/${type
    //     .normalize('NFD')
    //     ?.replace(/[\u0300-\u036f]/g, '')
    //     ?.replace(/ /g, '-')}`,
    //   { state: { type } },
    // );
  };

  const getTypeImage = (type) => {
    const typeKey = type?.toLowerCase()?.replace(/\s+/g, '');
    return productConstants.productTypeImage[typeKey] || productConstants.productTypeImage.cool;
  };

  return (
    <TypeProductContainer>
      <TypeProductWrapper>
        <SectionTitle>DANH MỤC</SectionTitle>
        <TypeProductGrid>
          {data?.map((item, index) => (
            <TypeProductItem key={index} onClick={() => handleNavigateType(item)}>
              <TypeProductImage>
                <img src={getTypeImage(item)} alt={item} />
              </TypeProductImage>
              <TypeProductName>{item}</TypeProductName>
            </TypeProductItem>
          ))}
        </TypeProductGrid>
      </TypeProductWrapper>
    </TypeProductContainer>
  );
};

export default TypeProduct;
