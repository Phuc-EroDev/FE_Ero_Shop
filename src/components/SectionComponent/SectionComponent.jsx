import React, { useRef, useState, useMemo, useEffect } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import CardComponent from '../CardComponent/CardComponent';
import {
  SectionWrapper,
  SectionHeader,
  SectionTitle,
  ViewAllLink,
  ProductsContainer,
  ProductsGrid,
  NavigationButton,
  NavigationContainer,
  CardWrapper,
} from './style';

const SectionComponent = ({
  data = [],
  isMultiType = false,
  title = 'TÌM KIẾM HÀNG ĐẦU',
  viewAllText = 'EroShop >',
  onViewAll,
  showNavigation = true,
}) => {
  const scrollRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const productsPerPage = isMultiType ? 18 : 6; // 3 hàng x 6 sản phẩm hoặc 1 hàng x 6 sản phẩm

  // Reset currentPage when isMultiType changes
  useEffect(() => {
    setCurrentPage(0);
  }, [isMultiType]);

  // Tính toán dữ liệu hiển thị
  const { currentProducts, totalPages, canGoNext, canGoPrev } = useMemo(() => {
    const total = Math.ceil(data.length / productsPerPage);
    const startIndex = currentPage * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const current = data.slice(startIndex, endIndex);

    return {
      currentProducts: current,
      totalPages: total,
      canGoNext: currentPage < total - 1,
      canGoPrev: currentPage > 0,
    };
  }, [data, currentPage, productsPerPage, isMultiType]);

  const goToNextPage = () => {
    if (canGoNext && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentPage((prev) => prev + 1);
      setTimeout(() => setIsTransitioning(false), 400);
    }
  };

  const goToPrevPage = () => {
    if (canGoPrev && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentPage((prev) => prev - 1);
      setTimeout(() => setIsTransitioning(false), 400);
    }
  };

  const handleViewAll = () => {
    if (onViewAll) {
      onViewAll();
    }
  };

  return (
    <SectionWrapper>
      <SectionHeader>
        <SectionTitle>{title}</SectionTitle>
        <ViewAllLink onClick={handleViewAll}>{viewAllText}</ViewAllLink>
      </SectionHeader>

      <ProductsContainer>
        {showNavigation && (
          <NavigationContainer $position="left">
            <NavigationButton
              $direction="left"
              onClick={goToPrevPage}
              disabled={!canGoPrev || isTransitioning}
              style={{
                opacity: canGoPrev ? 1 : 0.5,
                cursor: canGoPrev && !isTransitioning ? 'pointer' : 'not-allowed',
              }}
            >
              <LeftOutlined />
            </NavigationButton>
          </NavigationContainer>
        )}

        <ProductsGrid key={currentPage} ref={scrollRef} $ismultitype={isMultiType}>
          {currentProducts?.map((product, index) => (
            <CardWrapper key={`${currentPage}-${product._id || product.id || index}`}>
              <CardComponent
                id={product._id || product.id}
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
            </CardWrapper>
          ))}
        </ProductsGrid>

        {showNavigation && (
          <NavigationContainer $position="right">
            <NavigationButton
              $direction="right"
              onClick={goToNextPage}
              disabled={!canGoNext || isTransitioning}
              style={{
                opacity: canGoNext ? 1 : 0.5,
                cursor: canGoNext && !isTransitioning ? 'pointer' : 'not-allowed',
              }}
            >
              <RightOutlined />
            </NavigationButton>
          </NavigationContainer>
        )}
      </ProductsContainer>
    </SectionWrapper>
  );
};

export default SectionComponent;
