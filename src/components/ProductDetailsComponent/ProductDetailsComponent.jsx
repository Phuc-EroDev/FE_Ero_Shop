import React, { useEffect, useMemo, useState } from 'react';
import { Col, Image, Rate, Row } from 'antd';
import * as ProductService from '../../services/ProductService';

import imageSmall1 from '../../assets/images/imageSmall1.png';
import imageSmall2 from '../../assets/images/imageSmall2.png';
import imageSmall3 from '../../assets/images/imageSmall3.png';
import imageSmall4 from '../../assets/images/imageSmall4.png';
import imageSmall5 from '../../assets/images/imageSmall5.png';
import FormattedTextComponent from '../FormattedTextComponent/FormattedTextComponent';
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
  WrapperMainContainer,
  WrapperMainImage,
  WrapperImageCol,
  WrapperInfoCol,
  WrapperQuantitySection,
  WrapperButtonSection,
  WrapperErrorMessage,
  WrapperCommentContainer,
  WrapperThumbnailGallery,
  WrapperRelatedProducts,
  WrapperSpecifications,
} from './style';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import Loading from '../LoadingComponent/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { addOrderProduct } from '../../redux/slides/orderSlide';
import LikeButtonComponent from '../LikeButtonComponent/LikeButtonComponent';
import FbCommentComponent from '../FbCommentComponent/FbCommentComponent';
import { initFacebookSDK } from '../../utils';
import SectionComponent from '../SectionComponent/SectionComponent';

const ProductDetailsComponent = ({ idProduct }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user);

  const [numProduct, setNumProduct] = useState(1);
  const [amountMessage, setAmountMessage] = useState('');
  const [currentImage, setCurrentImage] = useState(null);

  let smallImages = [];

  const handleImageClick = (imageSrc) => {
    setCurrentImage(imageSrc);
  };

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

  if (productDetails?.data?.image) {
    smallImages = productDetails?.data?.image;
  }

  // Fetch products with same type
  const fetchProductsByType = async (type) => {
    if (!type) return [];
    const response = await ProductService.getAllProduct('', 100); // Get more products
    return (
      response?.data?.filter(
        (product) => product.type === type && product._id !== idProduct, // Exclude current product
      ) || []
    );
  };

  const { data: relatedProducts = [] } = useQuery({
    queryKey: ['related-products', productDetails?.data?.type, idProduct],
    queryFn: () => fetchProductsByType(productDetails?.data?.type),
    enabled: !!productDetails?.data?.type,
  });

  const onChange = (value) => {
    if (value > productDetails?.data?.countInStock) {
      setNumProduct(Number(productDetails?.data?.countInStock));
    } else if (value < 1) {
      setNumProduct(Number(1));
    } else {
      setNumProduct(Number(value));
    }
  };

  const handleChangeQuantity = (action, isChange) => {
    if (action === 'decrease' && isChange) {
      setNumProduct((prev) => (prev > 0 ? prev - 1 : 0));
      setAmountMessage('');
    } else if (action === 'increase' && isChange) {
      setNumProduct((prev) => prev + 1);
    } else if (action === 'increase' && !isChange) {
      setAmountMessage(
        `Số lượng sản phẩm này không đủ, chỉ có thể chọn tối đa ${productDetails?.data?.countInStock} sản phẩm`,
      );
    }
  };

  const handleAddOrderProduct = () => {
    if (!user?.id) {
      navigate('/sign-in', { state: location?.pathname });
    } else if (!productDetails?.data?.countInStock) {
      setAmountMessage('Sản phẩm này đã hết hàng');
    } else {
      dispatch(
        addOrderProduct({
          orderItem: {
            name: productDetails?.data?.name,
            amount: numProduct,
            countInStock: productDetails?.data?.countInStock,
            image: productDetails?.data?.image,
            price: productDetails?.data?.price,
            product: productDetails?.data?._id,
            discount: productDetails?.data?.discount || 0,
          },
        }),
      );
      navigate('/order');
    }
  };

  const handleNavigateType = (type) => {
    navigate(`/type-product/`, { state: { type } });
  };

  // Facebook integration
  // useEffect(() => {
  //   initFacebookSDK();
  // }, []);

  return (
    <Loading isPending={isLoading}>
      <WrapperMainContainer>
        <Row>
          <WrapperImageCol xs={24} md={10}>
            <WrapperMainImage>
              <Image src={currentImage || productDetails?.data?.image[0]} alt="Image Product" preview={false} />
            </WrapperMainImage>
            <Row style={{ paddingTop: '10px', justifyContent: 'space-between' }}>
              {smallImages.map((image, index) => (
                <WrapperStyleColImage key={index} span={4}>
                  <WrapperStyleImageSmall
                    onClick={() => handleImageClick(image)}
                    className={currentImage === image ? 'active' : ''}
                  >
                    <Image src={image} alt={`Image Small ${index + 1}`} preview={false} />
                  </WrapperStyleImageSmall>
                </WrapperStyleColImage>
              ))}
            </Row>
          </WrapperImageCol>
          <WrapperInfoCol xs={24} md={14}>
            <WrapperStyleNameProduct>{productDetails?.data?.name}</WrapperStyleNameProduct>
            <div>
              <Rate
                style={{ fontSize: 'clamp(14px, 2vw, 16px)' }}
                disabled
                allowHalf
                value={productDetails?.data?.rating}
                defaultValue={5}
              />
              <WrapperStyleTextSell>
                {' '}
                (Xem 0 đánh giá) | Đã bán {productDetails?.data?.selled || 0}+
              </WrapperStyleTextSell>
            </div>
            <WrapperPriceProduct>
              <WrapperPriceTextProduct>{productDetails?.data?.price?.toLocaleString()} VND</WrapperPriceTextProduct>
            </WrapperPriceProduct>

            <WrapperQuantitySection>
              <div className="quantity-label">Số lượng</div>
              <WrapperQualityProduct>
                <ButtonComponent
                  icon={<MinusOutlined />}
                  style={{
                    color: '#fdf6ec',
                    backgroundColor: '#404040',
                    border: '1px solid #555',
                    width: 'clamp(28px, 6vw, 36px)',
                    height: 'clamp(28px, 6vw, 32px)',
                  }}
                  onClick={() => handleChangeQuantity('decrease', numProduct > 1)}
                />
                <WrapperInputNumber value={numProduct} defaultValue={1} min={1} onChange={onChange} />
                <ButtonComponent
                  icon={<PlusOutlined />}
                  style={{
                    color: '#fdf6ec',
                    backgroundColor: '#404040',
                    border: '1px solid #555',
                    width: 'clamp(28px, 6vw, 36px)',
                    height: 'clamp(28px, 6vw, 32px)',
                  }}
                  onClick={() => handleChangeQuantity('increase', numProduct < productDetails?.data?.countInStock)}
                />
              </WrapperQualityProduct>
            </WrapperQuantitySection>

            <WrapperButtonSection>
              <ButtonComponent
                onClick={handleAddOrderProduct}
                style={{
                  backgroundColor: !!productDetails?.data?.countInStock ? '#C68642' : '#404040',
                  cursor: !!productDetails?.data?.countInStock ? 'pointer' : 'not-allowed',
                  borderRadius: '4px',
                  color: '#FDF6EC',
                  fontWeight: '600',
                  border: 'none',
                }}
                textbutton={'Mua ngay'}
              />
              <ButtonComponent
                style={{
                  backgroundColor: 'transparent',
                  borderRadius: '4px',
                  color: '#C68642',
                  border: '1px solid #C68642',
                }}
                textbutton={'Mua trả sau'}
              />
            </WrapperButtonSection>

            {!!amountMessage && <WrapperErrorMessage>{amountMessage}</WrapperErrorMessage>}
          </WrapperInfoCol>
        </Row>

        <WrapperCommentContainer>
          <div
            style={{
              marginTop: '20px',
            }}
          >
            <div
              style={{
                backgroundColor: '#1a1a1a',
                padding: '16px 24px',
                borderRadius: '12px',
                border: '1px solid #333333',
                marginBottom: '24px',
              }}
            >
              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#C68642',
                  margin: '0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                MÔ TẢ SẢN PHẨM
              </h3>
            </div>
            <FormattedTextComponent
              text={productDetails?.data?.description}
              style={{
                fontSize: '14px',
                color: '#D1D1D1',
                backgroundColor: 'transparent',
                padding: '0 8px',
                border: 'none',
                margin: '0',
              }}
            />
          </div>
        </WrapperCommentContainer>

        <WrapperCommentContainer>
          <SectionComponent
            data={relatedProducts}
            title={`SẢN PHẨM CÙNG LOẠI - ${productDetails?.data?.type?.toUpperCase() || ''}`}
            viewAllText="Xem tất cả >"
            onViewAll={() => handleNavigateType(productDetails?.data?.type)}
            isMultiType={false}
            showNavigation={true}
          />
        </WrapperCommentContainer>

        <WrapperCommentContainer>
          <FbCommentComponent
            dataHref={
              import.meta.env.VITE_IS_LOCAL
                ? 'https://developers.facebook.com/docs/plugins/comments#configurator'
                : window.location.href
            }
            width={'100%'}
          />
        </WrapperCommentContainer>
      </WrapperMainContainer>
    </Loading>
  );
};

export default ProductDetailsComponent;
