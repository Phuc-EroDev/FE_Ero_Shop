import React from 'react';
import { Col, Image, InputNumber, Rate, Row } from 'antd';
import product1 from '../../assets/images/product1.png';
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

const ProductDetailsComponent = () => {
  const onChange = () => {};
  return (
    <Row style={{ padding: '16px', backgroundColor: '#272727' }}>
      <Col span={10} style={{ paddingRight: '16px', borderRadius: '4px', borderRight: '1px solid #3b3a38' }}>
        <Image src={product1} alt="Image Product" preview={false} style={{ borderRadius: '4px' }} />
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
        <WrapperStyleNameProduct>Iphone 16e</WrapperStyleNameProduct>
        <div>
          <Rate style={{ fontSize: '12px' }} disabled allowHalf defaultValue={4} />
          <WrapperStyleTextSell> (Xem 4 đánh giá) | Đã bán 1000+</WrapperStyleTextSell>
        </div>
        <WrapperPriceProduct>
          <WrapperPriceTextProduct>1.000.000 VND</WrapperPriceTextProduct>
        </WrapperPriceProduct>
        <WrapperAddressProduct>
          <span>Giao den </span>
          <span className="address"> 144/86, Nguyen Luong Bang, Lien Chieu, Da Nang </span> -
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
            <ButtonComponent icon={<MinusOutlined />} style={{ color: '#000' }} size={'small'} />
            <WrapperInputNumber defaultValue={0} size={'small'} onChange={onChange} />
            <ButtonComponent icon={<PlusOutlined />} style={{ color: '#000' }} size={'small'} />
          </WrapperQualityProduct>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <ButtonComponent
            size={'large'}
            style={{
              backgroundColor: '#C68642',
              borderRadius: '4px',
              color: '#FDF6EC',
              fontWeight: '600',
              width: '220px',
            }}
            textButton={'Mua ngay'}
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
            textButton={'Mua Trả sau'}
          />
        </div>
      </Col>
    </Row>
  );
};

export default ProductDetailsComponent;
