import React, { useEffect, useState } from 'react';
import { Col, Row, Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { WrapperNavbar, WrapperProducts, WrapperContainer, WrapperContent } from './style';
import * as ProductService from '../../services/ProductService';
import Loading from '../../components/LoadingComponent/Loading';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';
import SearchResultComponent from '../../components/SearchResultComponent/SearchResultComponent';
import TypeListComponent from '../../components/TypeListComponent/TypeListComponent';
import ProductListComponent from '../../components/ProductListComponent/ProductListComponent';
import { useResponsive } from '../../hooks/useResponsive';

const TypeProductPage = () => {
  const location = useLocation();
  const { state } = location;
  const { isMobile } = useResponsive();

  const [typeProducts, setTypeProducts] = useState([]);
  const [selectedType, setSelectedType] = useState(state?.type || '');
  const [loading, setLoading] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

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
    if (isMobile) {
      setDrawerVisible(false);
    }
  };



  return (
    <Loading isPending={loading}>
      <WrapperContainer>
        <WrapperContent>
          {isMobile && (
            <div style={{
              marginBottom: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start'
            }}>
              <Button
                type="primary"
                onClick={() => setDrawerVisible(true)}
                icon={<MenuOutlined />}
                style={{
                  backgroundColor: '#C68642',
                  borderColor: '#C68642',
                }}
              >
                Danh mục sản phẩm
              </Button>
            </div>
          )}

          <Row gutter={[24, 24]} style={{ minHeight: 'calc(100vh - 120px)' }}>
            {!isMobile && (
              <Col xs={24} sm={24} md={6} lg={5} xl={4}>
                <WrapperNavbar>
                  <TypeListComponent
                    typeProducts={typeProducts}
                    selectedType={selectedType}
                    onTypeSelect={handleTypeSelect}
                  />
                </WrapperNavbar>
              </Col>
            )}
            <Col xs={24} sm={24} md={isMobile ? 24 : 18} lg={isMobile ? 24 : 19} xl={isMobile ? 24 : 20}>
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

      {/* Drawer for mobile view */}
      <Drawer
        title="Danh mục sản phẩm"
        placement="left"
        closeIcon={<span style={{ color: 'red' }}>✕</span>}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={isMobile ? '85%' : 320}
        bodyStyle={{ padding: 0, backgroundColor: '#333333' }}
        headerStyle={{ backgroundColor: '#2a2a2a', color: '#D4A574', borderBottom: '1px solid #444' }}
      >
        <TypeListComponent
          typeProducts={typeProducts}
          selectedType={selectedType}
          onTypeSelect={handleTypeSelect}
        />
      </Drawer>
    </Loading>
  );
};

export default TypeProductPage;
