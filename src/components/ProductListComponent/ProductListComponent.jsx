import React, { useEffect, useState } from 'react';
import { Row, Col, Pagination, Empty } from 'antd';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../CardComponent/CardComponent';
import Loading from '../LoadingComponent/Loading';
import * as ProductService from '../../services/ProductService';
import { WrapperProducts, WrapperTitle } from './style';

const ProductListComponent = ({ selectedType }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 12,
    total: 0,
  });

  const navigate = useNavigate();

  const handleDetailsProduct = (id) => {
    navigate(`/product-details/${id}`);
  };

  // Fetch products by type or all products
  const fetchProducts = async (type = '', page = 1, limit = 12) => {
    setLoading(true);
    try {
      let res;
      if (type) {
        res = await ProductService.getProductType(type, page - 1, limit);
      } else {
        res = await ProductService.getAllProduct('', page - 1, limit);
      }

      if (res?.status === 'OK') {
        setProducts(res?.data || []);
        setPagination((prev) => ({
          ...prev,
          total: res?.total || res?.data?.length || 0,
        }));
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPagination((prev) => ({ ...prev, current: 1 }));
    fetchProducts(selectedType, 1, pagination.pageSize);
  }, [selectedType]);

  const handlePageChange = (page, pageSize) => {
    setPagination((prev) => ({ ...prev, current: page, pageSize }));
    fetchProducts(selectedType, page, pageSize);
  };

  const getTitle = () => {
    if (selectedType) {
      return `Sản phẩm ${selectedType} (${pagination.total} sản phẩm)`;
    }
    return `Tất cả sản phẩm (${pagination.total} sản phẩm)`;
  };

  if (loading) {
    return <Loading isPending={true} />;
  }

  return (
    <div>
      <WrapperTitle>{getTitle()}</WrapperTitle>

      <WrapperProducts>
        {products.length > 0 ? (
          <>
            <Row gutter={[20, 20]}>
              {products.map((product) => (
                <Col key={product._id} xs={24} sm={12} md={8} lg={6} xl={6}>
                  <CardComponent
                    countInStock={product.countInStock}
                    description={product.description}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    rating={product.rating}
                    type={product.type}
                    selled={product.selled}
                    discount={product.discount}
                    id={product._id}
                    onClick={() => handleDetailsProduct(product._id)}
                  />
                </Col>
              ))}
            </Row>

            {pagination.total > pagination.pageSize && (
              <Pagination
                current={pagination.current}
                pageSize={pagination.pageSize}
                total={pagination.total}
                onChange={handlePageChange}
                showSizeChanger
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '40px',
                  padding: '20px 0',
                }}
              />
            )}
          </>
        ) : (
          <Empty
            description={
              selectedType ? `Không có sản phẩm nào trong danh mục "${selectedType}"` : 'Không có sản phẩm nào'
            }
            style={{ margin: '60px 0' }}
          />
        )}
      </WrapperProducts>
    </div>
  );
};

export default ProductListComponent;
