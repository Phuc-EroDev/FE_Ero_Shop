import React, { useEffect, useState } from 'react';
import { Row, Col, Empty } from 'antd';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../CardComponent/CardComponent';
import Loading from '../LoadingComponent/Loading';
import * as ProductService from '../../services/ProductService';
import { WrapperSearchResult, WrapperTitle, WrapperProducts } from './style';

const SearchResultComponent = ({ 
  searchTerm = '', 
  isLoading = false, 
  title,
  showTitle = true,
  selectedType = ''
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDetailsProduct = (id) => {
    navigate(`/product-details/${id}`);
  };

  // Fetch data based on selectedType and searchTerm
  const fetchSearchData = async () => {
    setLoading(true);
    try {
      let res;
      if (selectedType) {
        res = await ProductService.getProductType(selectedType);
      } else {
        res = await ProductService.getAllProduct();
      }
      
      if (res?.status === 'OK') {
        setData(res?.data || []);
      }
    } catch (error) {
      console.error('Error fetching search data:', error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSearchData();
  }, [selectedType]);

  const filteredData = data?.filter(product => 
    product?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product?.type?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (isLoading || loading) {
    return <Loading isPending={true} />;
  }

  return (
    <WrapperSearchResult>
      {showTitle && (
        <WrapperTitle>
          {title || (searchTerm ? 
            `Kết quả tìm kiếm cho "${searchTerm}" (${filteredData.length} sản phẩm)` : 
            'Tất cả sản phẩm'
          )}
        </WrapperTitle>
      )}
      
      <WrapperProducts>
        {filteredData.length > 0 ? (
          <Row gutter={[20, 20]}>
            {filteredData.map((product) => (
              <Col 
                key={product._id} 
                xs={24} 
                sm={12} 
                md={8} 
                lg={6} 
                xl={4}
              >
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
        ) : (
          <Empty
            description={
              searchTerm 
                ? `Không tìm thấy sản phẩm nào với từ khóa "${searchTerm}"`
                : "Không có sản phẩm nào"
            }
            style={{ margin: '40px 0' }}
          />
        )}
      </WrapperProducts>
    </WrapperSearchResult>
  );
};

export default SearchResultComponent;
