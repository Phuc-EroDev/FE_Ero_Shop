import React from 'react';
import { Image } from 'antd';
import Slider from 'react-slick';

const SliderComponent = ({ arrImages }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <Slider {...settings}>
      {arrImages.map((image, index) => {
        return <Image src={image} alt={`Slider`} key={index} preview={false} width={'100%'} height={'auto'} />;
      })}
    </Slider>
  );
};

export default SliderComponent;
