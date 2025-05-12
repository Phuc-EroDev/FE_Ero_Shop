import React from 'react';
import { Col, Image, Row } from 'antd';
import product1 from '../../assets/images/product1.png';
import imageSmall1 from '../../assets/images/imageSmall1.png';
import imageSmall2 from '../../assets/images/imageSmall2.png';
import imageSmall3 from '../../assets/images/imageSmall3.png';
import imageSmall4 from '../../assets/images/imageSmall4.png';
import imageSmall5 from '../../assets/images/imageSmall5.png';
import { WrapperStyleColImage, WrapperStyleImageSmall } from './style';

const ProductDetailsComponent = () => {
  return (
    <Row style={{ padding: '16px', backgroundColor: '#272727' }}>
      <Col span={10}>
        <Image src={product1} alt="Image Product" preview={false} />
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
      <Col span={14}></Col>
    </Row>
  );
};

export default ProductDetailsComponent;
