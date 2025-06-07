import React, { Fragment, useEffect, useState } from 'react';
import NavBarComponent from '../../components/NavBarComponent/NavBarComponent';
import CardComponent from '../../components/CardComponent/CardComponent';
import { Col, Pagination, Row } from 'antd';
import { WrapperNavbar, WrapperProducts, WrapperContainer } from './style';
import { useLocation } from 'react-router-dom';
import * as ProductService from '../../services/ProductService';
import Loading from '../../components/LoadingComponent/Loading';
import { useSelector } from 'react-redux';
import { useDebounce } from '../../hooks/useDebounce';

const TypeProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ limit: 10, page: 0, total: 1 });

  const { state } = useLocation();
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 500);

  const onChange = (current, pageSize) => {
    setPagination({ ...pagination, page: current - 1, limit: pageSize });
  };

  const fetchProductType = async (type, page, limit) => {
    setLoading(true);
    const res = await ProductService.getProductType(type, page, limit);
    if (res?.status === 'OK') {
      setProducts(res?.data);
      setPagination({ ...pagination, total: res?.totalPage });
      setLoading(false);
    } else {
      setLoading(false);
    }
    return res;
  };

  useEffect(() => {
    if (state?.type) {
      fetchProductType(state.type, pagination.page, pagination.limit);
    }
  }, [state?.type, pagination.page, pagination.limit]);

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
                {products
                  ?.filter((prod) => {
                    if (searchDebounce === '') {
                      return prod;
                    } else if (prod?.name?.toLowerCase().includes(searchDebounce?.toLowerCase())) {
                      return prod;
                    }
                  })
                  ?.map((product) => {
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
                defaultCurrent={pagination?.page + 1}
                total={pagination?.total}
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
