import React, { useEffect, useRef, useState } from 'react';
import TypeProduct from '../../components/TypeProduct/TypeProduct';
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import { WrapperButtonMore, WrapperProducts, WrapperTypeProduct } from './style';
import slider1 from '../../assets/images/slider1.png';
import slider2 from '../../assets/images/slider2.png';
import CardComponent from '../../components/CardComponent/CardComponent';
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../services/ProductService';
import { useSelector } from 'react-redux';
import Loading from '../../components/LoadingComponent/Loading';
import { useDebounce } from '../../hooks/useDebounce';

const HomePage = () => {
  const arr = ['TV', 'Laptop', 'Phone'];

  const [stateProducts, setStateProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchProduct = useSelector((state) => state?.product?.search);
  const refSearch = useRef();
  const searchDebounce = useDebounce(searchProduct, 1000);

  const fetchProductAll = async (search) => {
    const res = await ProductService.getAllProduct(search);
    if (search?.length > 0 || refSearch.current) {
      setStateProducts(res?.data);
    } else {
      return res;
    }
  };

  useEffect(() => {
    if (refSearch.current) {
      setLoading(true);
      fetchProductAll(searchDebounce);
    }
    refSearch.current = true;
    setLoading(false);
  }, [searchDebounce]);

  const { isLoading, data: products } = useQuery({
    queryKey: ['product'],
    queryFn: fetchProductAll,
    retry: 1,
    retryDelay: 1000,
  });

  useEffect(() => {
    if (products?.data?.length > 0) {
      setStateProducts(products.data);
    }
  }, [products]);

  return (
    <Loading isPending={isLoading || loading}>
      <div style={{ margin: '0 auto', padding: '0 120px' }}>
        <WrapperTypeProduct>
          {arr.map((item) => {
            return <TypeProduct key={item} name={item} />;
          })}
        </WrapperTypeProduct>
      </div>
      <div className="body" style={{ width: '100%', backgroundColor: ' #333131' }}>
        <div id="container" style={{ margin: '0 auto', padding: '0 120px', height: '1000px', width: '100%' }}>
          <SliderComponent arrImages={[slider1, slider2]} />
          <WrapperProducts>
            {stateProducts?.map((product) => {
              return (
                <CardComponent
                  key={product._id}
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
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            <WrapperButtonMore
              textbutton="Xem them"
              type="outline"
              style={{
                color: ' #D29B63',
                border: '1px solid #D29B63',
                width: '240px',
                height: '38px',
                fontWeight: '500',
              }}
            />
          </div>
        </div>
      </div>
    </Loading>
  );
};

export default HomePage;
