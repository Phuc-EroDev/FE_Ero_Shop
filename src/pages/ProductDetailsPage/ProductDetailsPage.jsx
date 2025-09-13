import React from 'react';
import ProductDetailsComponent from '../../components/ProductDetailsComponent/ProductDetailsComponent';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductDetailsContainer, BreadcrumbWrapper, BreadcrumbLink } from './style';

const ProductDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <ProductDetailsContainer>
      <BreadcrumbWrapper>
        <BreadcrumbLink onClick={() => navigate('/')}>
          Trang chủ
        </BreadcrumbLink>{' '}
        - Chi tiết sản phẩm
      </BreadcrumbWrapper>
      <ProductDetailsComponent idProduct={id} />
    </ProductDetailsContainer>
  );
};

export default ProductDetailsPage;
