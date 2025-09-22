import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Upload, message, List, Image } from 'antd';
import { UploadOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import TypeProduct from '../../components/TypeProduct/TypeProduct';
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import SearchResultComponent from '../../components/SearchResultComponent/SearchResultComponent';
import { BodyWrapper, PageContainer, WrapperButtonMore, WrapperTypeProduct } from './style';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import * as ProductService from '../../services/ProductService';
import Loading from '../../components/LoadingComponent/Loading';
import { useDebounce } from '../../hooks/useDebounce';
import { useSlideManagement } from '../../hooks/useSlideManagement';
import SectionComponent from '../../components/SectionComponent/SectionComponent';

const HomePage = () => {
  const [typeProducts, setTypeProducts] = useState([]);
  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(0);
  const [isSlideModalOpen, setIsSlideModalOpen] = useState(false);

  const user = useSelector((state) => state?.user);
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 500);

  // Use slide management hook
  const { slides: slideImages, handleAddSlide, handleDeleteSlide } = useSlideManagement();

  const slideUrls = slideImages.map((slide) => slide.url);

  const navigate = useNavigate();

  const handleNavigateType = (type) => {
    navigate(`/type-product/`, { state: { type } });
  };

  const handleChangeSlide = () => {
    setIsSlideModalOpen(true);
  };

  const handleCloseSlideModal = () => {
    setIsSlideModalOpen(false);
  };

  const handleUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('Chỉ được upload file hình ảnh!');
      return false;
    }

    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('Hình ảnh phải nhỏ hơn 5MB!');
      return false;
    }

    // Add slide using hook
    handleAddSlide(file);
    return false; // Prevent automatic upload
  };

  const handleUploadSlide = {
    name: 'file',
    accept: 'image/*',
    beforeUpload: handleUpload,
  };

  const fetchProductAll = async () => {
    const res = await ProductService.getAllProduct('', 0, 1000);
    return res;
  };

  const fetchProductType = async (type) => {
    const res = await ProductService.getProductType(type);
    return res;
  };

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    if (res?.status === 'OK') {
      setTypeProducts(res?.data);
    }
    return res?.data;
  };

  const { isLoading: isLoadingPopular, data: products } = useQuery({
    queryKey: ['product', limit, searchDebounce],
    queryFn: fetchProductAll,
    retry: 1,
    retryDelay: 1000,
    placeholderData: keepPreviousData,
  });

  const { isLoading: isLoadingElectron, data: productsElectron } = useQuery({
    queryKey: ['productElectron'],
    queryFn: () => fetchProductType('laptop'),
  });

  useEffect(() => {
    fetchAllTypeProduct();
  }, []);

  return (
    <>
      <PageContainer>
        <WrapperTypeProduct>
          <h5 style={{ padding: '6px 0', fontSize: '14px' }}>
            <span style={{ color: ' #C68642', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => navigate('/')}>
              {'Trang chủ >'}
            </span>
          </h5>
        </WrapperTypeProduct>
      </PageContainer>
      <BodyWrapper>
        <PageContainer id="container" style={{ minHeight: 'auto', width: '100%' }}>
          <div style={{ position: 'relative' }}>
            <SliderComponent arrImages={slideUrls} />
            {user?.isAdmin && <WrapperButtonMore textbutton={'Sửa slide'} type="outline" onClick={handleChangeSlide} />}
          </div>

          {/* Hiển thị kết quả search hoặc nội dung trang chủ */}
          {searchDebounce ? (
            <SearchResultComponent data={products?.data} searchTerm={searchDebounce} isLoading={isLoadingPopular} />
          ) : (
            <>
              <Loading isPending={isLoadingPopular}>
                <SectionComponent
                  data={products?.data?.sort((a, b) => b.selled - a.selled).slice(0, 12)}
                  title="SẢN PHẨM NỔI BẬT"
                />
              </Loading>

              <TypeProduct data={typeProducts} />

              <Loading isPending={isLoadingElectron}>
                <SectionComponent
                  data={productsElectron?.data}
                  title="Laptop"
                  viewAllText="Xem thêm >"
                  onViewAll={() => handleNavigateType('laptop')}
                />
              </Loading>

              <Loading isPending={isLoadingPopular || isLoadingElectron}>
                <SectionComponent
                  data={products?.data?.filter((item) => !productsElectron?.data?.some(electronItem => electronItem._id === item._id))}
                  isMultiType={true}
                  title="SẢN PHẨM KHÁC"
                />
              </Loading>
            </>
          )}
        </PageContainer>
      </BodyWrapper>

      {/* Slide Management Modal */}
      <ModalComponent
        title="Quản lý Slide"
        isOpen={isSlideModalOpen}
        onCancel={handleCloseSlideModal}
        onOk={handleCloseSlideModal}
        width={800}
        okText="Đóng"
        cancelText="Hủy"
      >
        <div style={{ marginBottom: '20px' }}>
          <Upload {...handleUploadSlide}>
            <Button icon={<UploadOutlined />} type="dashed" size="large">
              Thêm slide mới
            </Button>
          </Upload>
          <p style={{ color: '#666', marginTop: '8px', fontSize: '12px' }}>
            * Chỉ chấp nhận file hình ảnh (JPG, PNG, GIF) và kích thước &lt; 5MB
          </p>
        </div>

        <List
          dataSource={slideImages}
          renderItem={(slide, index) => (
            <List.Item
              actions={[
                <Button
                  key="preview"
                  icon={<EyeOutlined />}
                  onClick={() => {
                    Image.preview({
                      src: slide.url,
                      title: slide.name,
                    });
                  }}
                >
                  Xem
                </Button>,
                <Button
                  key="delete"
                  icon={<DeleteOutlined />}
                  danger
                  onClick={() => handleDeleteSlide(slide.id)}
                  disabled={slideImages.length <= 1}
                >
                  Xóa
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Image
                    width={80}
                    height={50}
                    src={slide.url}
                    alt={slide.name}
                    style={{ objectFit: 'cover', borderRadius: '4px' }}
                    preview={false}
                  />
                }
                title={slide.name}
                description={`Slide ${index + 1} - ${slide.isDefault ? 'File gốc' : 'File mới'}`}
              />
            </List.Item>
          )}
        />
      </ModalComponent>
    </>
  );
};

export default HomePage;
