import React, { useEffect, useRef, useState } from 'react';
import TypeProduct from '../../components/TypeProduct/TypeProduct';
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import { WrapperButtonMore, WrapperProducts, WrapperTypeProduct } from './style';
import slider1 from '../../assets/images/slider1.png';
import slider2 from '../../assets/images/slider2.png';
import CardComponent from '../../components/CardComponent/CardComponent';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import * as ProductService from '../../services/ProductService';
import { useSelector } from 'react-redux';
import Loading from '../../components/LoadingComponent/Loading';
import { useDebounce } from '../../hooks/useDebounce';

const HomePage = () => {
  const [typeProducts, setTypeProducts] = useState([]);
  const [limit, setLimit] = useState(6);
  // const [page, setPage] = useState(1);

  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 1000);

  const fetchProductAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1];
    const searchDebounce = context?.queryKey && context?.queryKey[2];
    const res = await ProductService.getAllProduct(searchDebounce, limit);
    return res;
  };

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    if (res?.status === 'OK') {
      setTypeProducts(res?.data);
    }
    return res?.data;
  };

  const {
    isLoading,
    data: products,
    isPreviousData,
  } = useQuery({
    queryKey: ['product', limit, searchDebounce],
    queryFn: fetchProductAll,
    retry: 1,
    retryDelay: 1000,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    fetchAllTypeProduct();
  }, []);

  return (
    <Loading isPending={isLoading}>
      <div style={{ margin: '0 auto', padding: '0 120px' }}>
        <WrapperTypeProduct>
          {typeProducts.map((item) => {
            return <TypeProduct key={item} name={item} />;
          })}
        </WrapperTypeProduct>
      </div>
      <div className="body" style={{ width: '100%', backgroundColor: ' #333131' }}>
        <div id="container" style={{ margin: '0 auto', padding: '0 120px', height: '1000px', width: '100%' }}>
          <SliderComponent arrImages={[slider1, slider2]} />
          <WrapperProducts>
            {products?.data?.map((product) => {
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
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            <WrapperButtonMore
              textbutton={isPreviousData ? 'Loading...' : 'Xem thêm'}
              type="outline"
              disabled={products?.total === products?.data?.length || products?.totalPage === 1}
              onClick={() => setLimit((prev) => prev + 6)}
            />
          </div>
        </div>
      </div>
    </Loading>
  );
};

export default HomePage;
