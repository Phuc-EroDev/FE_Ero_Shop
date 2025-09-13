import React from 'react';
import { StarFilled } from '@ant-design/icons';
import {
  StyleNameProduct,
  WrapperCardStyle,
  WrapperDiscountText,
  WrapperPriceText,
  WrapperReportText,
  WrapperStyleTextSell,
  WrapperOutOfStockLabel,
} from './style';
import labelCard from '../../assets/images/labelCard.png';
import { useNavigate } from 'react-router-dom';

const CardComponent = (props) => {
  const navigate = useNavigate();
  const { id, countInStock, description, image, name, price, rating, type, selled, discount } = props;

  const handleDetailsProduct = (id) => {
    navigate(`/product-details/${id}`);
  };

  return (
    <WrapperCardStyle
      hoverable
      cover={
        <div style={{ position: 'relative' }}>
          <img alt={name} src={image[0]} />
          {countInStock === 0 && <WrapperOutOfStockLabel>HẾT HÀNG</WrapperOutOfStockLabel>}
        </div>
      }
      onClick={() => handleDetailsProduct(id)}
      disabled={countInStock === 0}
    >
      <img
        src={labelCard}
        className="mall-badge"
      />
      <StyleNameProduct>{name}</StyleNameProduct>
      <WrapperReportText>
        <span style={{ marginRight: '4px' }}>
          <span>{rating} </span>
          <StarFilled className="star-icon" style={{ fontSize: '12px', color: 'yellow' }} />
        </span>
        <WrapperStyleTextSell> | Da ban {selled || 1000}+</WrapperStyleTextSell>
      </WrapperReportText>
      <WrapperPriceText>
        <span title={`${price?.toLocaleString()} VND`}>
          {price?.toLocaleString()} VND
        </span>
        <WrapperDiscountText>-{discount || 5}%</WrapperDiscountText>
      </WrapperPriceText>
    </WrapperCardStyle>
  );
};

export default CardComponent;
