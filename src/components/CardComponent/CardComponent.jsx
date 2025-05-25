import React from 'react';
import { StarFilled } from '@ant-design/icons';
import {
  StyleNameProduct,
  WrapperCardStyle,
  WrapperDiscountText,
  WrapperPriceText,
  WrapperReportText,
  WrapperStyleTextSell,
} from './style';
import labelCard from '../../assets/images/labelCard.png';
import Product from '../../assets/images/product1.png';

const CardComponent = (props) => {
  const { countInStock, description, image, name, price, rating, type, selled, discount } = props;
  return (
    <WrapperCardStyle hoverable cover={<img alt="example" src={Product} />}>
      <img src={labelCard} style={{ width: '25px', height: '18px', position: 'absolute', top: '5px', left: '-4px' }} />
      <StyleNameProduct>{name}</StyleNameProduct>
      <WrapperReportText>
        <span style={{ marginRight: '4px' }}>
          <span>{rating} </span> <StarFilled style={{ fontSize: '12px', color: 'yellow' }} />
        </span>
        <WrapperStyleTextSell> | Da ban {selled || 1000}+</WrapperStyleTextSell>
      </WrapperReportText>
      <WrapperPriceText>
        <span style={{ marginRight: '8px' }}>{price} VND </span>
        <WrapperDiscountText>-{discount || 5}%</WrapperDiscountText>
      </WrapperPriceText>
    </WrapperCardStyle>
  );
};

export default CardComponent;
