import React, { Fragment, useEffect, useState } from 'react';
import NavBarComponent from '../../components/NavBarComponent/NavBarComponent';
import CardComponent from '../../components/CardComponent/CardComponent';
import { Col, Pagination, Row } from 'antd';
import { WrapperNavbar, WrapperProducts, WrapperContainer } from './style';
import { useLocation } from 'react-router-dom';
import * as ProductService from '../../services/ProductService';
import Loading from '../../components/LoadingComponent/Loading';

const TypeProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();
  const onChange = () => {};

  const fetchProductType = async (type) => {
    setLoading(true);
    const res = await ProductService.getProductType(type);
    if (res?.status === 'OK') {
      setProducts(res?.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
    return res;
  };

  useEffect(() => {
    if (state?.type) {
      fetchProductType(state.type);
    }
  }, [state?.type]);

  return (
    <Loading isPending={loading}>
      <WrapperContainer>
        <div style={{ padding: '20px 120px' }}>
          <Row gutter={20} style={{ alignItems: 'flex-start' }}>
            <Col xs={24} sm={24} md={6} lg={5} xl={4}>
              <WrapperNavbar>
                <NavBarComponent />
              </WrapperNavbar>
            </Col>
            <Col xs={24} sm={24} md={18} lg={19} xl={20}>
              <WrapperProducts>
                {products?.map((product) => {
                  console.log('Product:', product);
                  return (
                    <CardComponent
                      key={product._id}
                      id={product._id}
                      countInStock={product.countInStock}
                      description={product.description}
                      image={product.image}
                      name={product.name}
                      price={product.price}
                      rating={product.rating}
                      type={product.type}
                      selled={product.selled}
                      discount={product.discount}
                    />
                  );
                })}
              </WrapperProducts>
              <Pagination
                defaultCurrent={2}
                total={100}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '30px',
                  marginBottom: '20px',
                }}
                onChange={onChange}
              />
            </Col>
          </Row>
        </div>
      </WrapperContainer>
    </Loading>
  );
};

export default TypeProductPage;
