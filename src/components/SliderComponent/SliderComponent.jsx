import React from 'react';
import { Image } from 'antd';
import { WrapperSliderStyle } from './style';
import { useResponsive } from '../../hooks/useResponsive';

const SliderComponent = ({ arrImages }) => {
  const { isMobile } = useResponsive();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: isMobile ? false : true,
    pauseOnHover: true,
    adaptiveHeight: true,
  };

  return (
    <WrapperSliderStyle {...settings}>
      {arrImages.map((image, index) => (
        <div key={index} className="slide-item">
          <Image
            src={image}
            alt={`Slider ${index + 1}`}
            preview={false}
            width={'100%'}
            className="slide-image"
          />
        </div>
      ))}
    </WrapperSliderStyle>
  );
};

export default SliderComponent;
