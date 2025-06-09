import React, { useState } from 'react';
import { Col, Image, Rate, Row } from 'antd';
import * as ProductService from '../../services/ProductService';

import imageSmall1 from '../../assets/images/imageSmall1.png';
import imageSmall2 from '../../assets/images/imageSmall2.png';
import imageSmall3 from '../../assets/images/imageSmall3.png';
import imageSmall4 from '../../assets/images/imageSmall4.png';
import imageSmall5 from '../../assets/images/imageSmall5.png';
import {
  WrapperAddressProduct,
  WrapperInputNumber,
  WrapperPriceProduct,
  WrapperPriceTextProduct,
  WrapperQualityProduct,
  WrapperStyleColImage,
  WrapperStyleImageSmall,
  WrapperStyleNameProduct,
  WrapperStyleTextSell,
} from './style';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import Loading from '../LoadingComponent/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { addOrderProduct } from '../../redux/slides/orderSlide';

const ProductDetailsComponent = ({ idProduct }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user);

  const [numProduct, setNumProduct] = useState(1);

  const fetchDetailsProduct = async (context) => {
    const id = context.queryKey && context.queryKey[1];
    if (id) {
      const response = await ProductService.getDetailsProduct(id);
      return response;
    }
    return null;
  };

  const { isLoading, data: productDetails } = useQuery({
    queryKey: ['product-details', idProduct],
    queryFn: fetchDetailsProduct,
    enabled: !!idProduct,
  });

  const onChange = (value) => {
    setNumProduct(Number(value));
  };

  const handleChangeQuantity = (action) => {
    if (action === 'decrease') {
      setNumProduct((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (action === 'increase') {
      setNumProduct((prev) => prev + 1);
    }
  };

  const handleAddOrderProduct = () => {
    if (!user?.id) {
      navigate('/sign-in', { state: location?.pathname });
    } else {
      dispatch(
        addOrderProduct({
          orderItem: {
            name: productDetails?.data?.name,
            amount: numProduct,
            image: productDetails?.data?.image,
            price: productDetails?.data?.price,
            product: productDetails?.data?._id,
          },
        }),
      );
    }
  };

  return (
    <Loading isPending={isLoading}>
      <Row style={{ padding: '16px', backgroundColor: '#272727' }}>
        <Col span={10} style={{ paddingRight: '16px', borderRadius: '4px', borderRight: '1px solid #3b3a38' }}>
          <Image
            src={productDetails?.data?.image}
            alt="Image Product"
            preview={false}
            style={{ borderRadius: '4px', width: '502px' }}
          />
          <Row style={{ paddingTop: '10px', justifyContent: 'space-between' }}>
            <WrapperStyleColImage span={4}>
              <WrapperStyleImageSmall>
                <Image src={imageSmall1} alt="Image Small 1" preview={false} />
              </WrapperStyleImageSmall>
            </WrapperStyleColImage>

            <WrapperStyleColImage span={4}>
              <WrapperStyleImageSmall>
                <Image src={imageSmall2} alt="Image Small 2" preview={false} />
              </WrapperStyleImageSmall>
            </WrapperStyleColImage>

            <WrapperStyleColImage span={4}>
              <WrapperStyleImageSmall>
                <Image src={imageSmall3} alt="Image Small 3" preview={false} />
              </WrapperStyleImageSmall>
            </WrapperStyleColImage>

            <WrapperStyleColImage span={4}>
              <WrapperStyleImageSmall>
                <Image src={imageSmall4} alt="Image Small 4" preview={false} />
              </WrapperStyleImageSmall>
            </WrapperStyleColImage>

            <WrapperStyleColImage span={4}>
              <WrapperStyleImageSmall>
                <Image src={imageSmall5} alt="Image Small 5" preview={false} />
              </WrapperStyleImageSmall>
            </WrapperStyleColImage>

            <WrapperStyleColImage span={4}>
              <WrapperStyleImageSmall>
                <Image src={imageSmall1} alt="Image Small 1" preview={false} />
              </WrapperStyleImageSmall>
            </WrapperStyleColImage>
          </Row>
        </Col>
        <Col span={14} style={{ paddingLeft: '16px' }}>
          <WrapperStyleNameProduct>{productDetails?.data?.name}</WrapperStyleNameProduct>
          <div>
            <Rate
              style={{ fontSize: '12px' }}
              disabled
              allowHalf
              value={productDetails?.data?.rating}
              defaultValue={5}
            />
            <WrapperStyleTextSell> (Xem 4 đánh giá) | Đã bán 1000+</WrapperStyleTextSell>
          </div>
          <WrapperPriceProduct>
            <WrapperPriceTextProduct>{productDetails?.data?.price.toLocaleString()} VND</WrapperPriceTextProduct>
          </WrapperPriceProduct>
          <WrapperAddressProduct>
            <span>Giao den </span>
            <span className="address">{user?.address || ' 144/86, Nguyen Luong Bang, Lien Chieu, Da Nang '}</span> -
            <span className="change-address"> Đổi địa chỉ </span>
          </WrapperAddressProduct>
          <div
            style={{
              margin: '10px 0 20px',
              padding: '10px 0',
              borderTop: '1px solid #3b3a38',
              borderBottom: '1px solid #3b3a38',
            }}
          >
            <div style={{ marginBottom: '10px' }}>So luong</div>
            <WrapperQualityProduct>
              <ButtonComponent
                icon={<MinusOutlined />}
                style={{ color: '#000' }}
                size={'small'}
                onClick={() => handleChangeQuantity('decrease')}
              />
              <WrapperInputNumber value={numProduct} defaultValue={1} size={'small'} onChange={onChange} />
              <ButtonComponent
                icon={<PlusOutlined />}
                style={{ color: '#000' }}
                size={'small'}
                onClick={() => handleChangeQuantity('increase')}
              />
            </WrapperQualityProduct>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ButtonComponent
              onClick={handleAddOrderProduct}
              size={'large'}
              style={{
                backgroundColor: '#C68642',
                borderRadius: '4px',
                color: '#FDF6EC',
                fontWeight: '600',
                width: '220px',
              }}
              textbutton={'Mua ngay'}
            />
            <ButtonComponent
              size={'large'}
              style={{
                backgroundColor: 'transparent',
                borderRadius: '4px',
                color: '#C68642',
                width: '220px',
                border: '1px solid #C68642',
              }}
              textbutton={'Mua Trả sau'}
            />
          </div>
        </Col>
      </Row>
    </Loading>
  );
};

export default ProductDetailsComponent;
