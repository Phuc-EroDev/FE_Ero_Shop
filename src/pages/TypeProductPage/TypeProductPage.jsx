import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { WrapperNavbar, WrapperProducts, WrapperContainer, WrapperContent } from './style';
import * as ProductService from '../../services/ProductService';
import Loading from '../../components/LoadingComponent/Loading';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';
import SearchResultComponent from '../../components/SearchResultComponent/SearchResultComponent';
import TypeListComponent from '../../components/TypeListComponent/TypeListComponent';
import ProductListComponent from '../../components/ProductListComponent/ProductListComponent';

const TypeProductPage = () => {
  const location = useLocation();
  const { state } = location;

  const [typeProducts, setTypeProducts] = useState([]);
  const [selectedType, setSelectedType] = useState(state?.type || '');
  const [loading, setLoading] = useState(false);

  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 500);

  // Fetch all type products
  const fetchAllTypeProduct = async () => {
    setLoading(true);
    try {
      const res = await ProductService.getAllTypeProduct();
      if (res?.status === 'OK') {
        setTypeProducts(res?.data);
      }
    } catch (error) {
      console.error('Error fetching type products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTypeProduct();
  }, []);

  const handleTypeSelect = (type) => {
    setSelectedType(type);
  };

  return (
    <Loading isPending={loading}>
      <WrapperContainer>
        <WrapperContent>
          <Row gutter={[24, 24]} style={{ minHeight: 'calc(100vh - 120px)' }}>
            <Col xs={24} sm={24} md={6} lg={5} xl={4}>
              <WrapperNavbar>
                <TypeListComponent
                  typeProducts={typeProducts}
                  selectedType={selectedType}
                  onTypeSelect={handleTypeSelect}
                />
              </WrapperNavbar>
            </Col>
            <Col xs={24} sm={24} md={18} lg={19} xl={20}>
              <WrapperProducts>
                {searchDebounce ? (
                  <SearchResultComponent
                    searchTerm={searchDebounce}
                    isLoading={false}
                    title={
                      selectedType
                        ? `Kết quả tìm kiếm trong danh mục "${selectedType}"`
                        : 'Kết quả tìm kiếm trong tất cả sản phẩm'
                    }
                    selectedType={selectedType}
                  />
                ) : (
                  <ProductListComponent selectedType={selectedType} />
                )}
              </WrapperProducts>
            </Col>
          </Row>
        </WrapperContent>
      </WrapperContainer>
    </Loading>
  );
};

export default TypeProductPage;
