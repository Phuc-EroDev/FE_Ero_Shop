import React from 'react';
import ProductDetailsComponent from '../../components/ProductDetailsComponent/ProductDetailsComponent';
import { useNavigate, useParams } from 'react-router-dom';

const ProductDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div style={{ padding: '0 120px', backgroundColor: '#333131', height: '1000px' }}>
      <h5 style={{ padding: '8px 0', fontSize: '16px' }}>
        <span style={{ color: ' #C68642', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => navigate('/')}>
          Trang chủ
        </span>{' '}
        - Chi tiết sản phẩm
      </h5>
      <ProductDetailsComponent idProduct={id} />
    </div>
  );
};

export default ProductDetailsPage;
