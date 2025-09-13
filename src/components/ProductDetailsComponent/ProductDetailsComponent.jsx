import React, { useEffect, useMemo, useState } from 'react';
import { Col, Image, Rate, Row } from 'antd';
import * as ProductService from '../../services/ProductService';
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
  ImageThumbnailContainer,
  ProductDescriptionHeader,
  ProductDescriptionText,
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
  const [isExpandedDescription, setIsExpandedDescription] = useState(false);

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
    const response = await ProductService.getProductType(type, 0, 1000);
    return (
      response?.data?.filter(
        (product) => product._id !== idProduct,
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
            <ImageThumbnailContainer>
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
            </ImageThumbnailContainer>
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
                  className="quantity-button"
                  onClick={() => handleChangeQuantity('decrease', numProduct > 1)}
                />
                <WrapperInputNumber value={numProduct} defaultValue={1} min={1} onChange={onChange} />
                <ButtonComponent
                  icon={<PlusOutlined />}
                  className="quantity-button"
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
                onClick={handleAddOrderProduct}
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
            <ProductDescriptionHeader>
              <h3>MÔ TẢ SẢN PHẨM</h3>
            </ProductDescriptionHeader>
            <div style={{ position: 'relative' }}>
              <ProductDescriptionText
                text={isExpandedDescription
                  ? productDetails?.data?.description
                  : productDetails?.data?.description?.length > 300
                    ? `${productDetails?.data?.description.substring(0, 300)}...`
                    : productDetails?.data?.description
                }
              />
              {productDetails?.data?.description?.length > 300 && (
                <div
                  onClick={() => setIsExpandedDescription(!isExpandedDescription)}
                  style={{
                    color: '#C68642',
                    cursor: 'pointer',
                    marginTop: '8px',
                    textAlign: 'left',
                    fontWeight: '500',
                  }}
                >
                  {isExpandedDescription ? '...Rút gọn' : '...Xem thêm'}
                </div>
              )}
            </div>
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
