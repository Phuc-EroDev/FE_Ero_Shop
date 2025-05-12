import React, { Fragment } from 'react';
import NavBarComponent from '../../components/NavBarComponent/NavBarComponent';
import CardComponent from '../../components/CardComponent/CardComponent';
import { Col, Pagination, Row } from 'antd';
import { WrapperNavbar, WrapperProducts } from './style';

const TypeProductPage = () => {
  const onChange = () => {};

  return (
    <div style={{ padding: '0 120px', backgroundColor: '#333131' }}>
      <Row style={{ flexWrap: 'nowrap', paddingTop: '10px' }}>
        <WrapperNavbar span={4}>
          <NavBarComponent />
        </WrapperNavbar>
        <Col span={20}>
          <WrapperProducts>
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
          </WrapperProducts>
          <Pagination
            defaultCurrent={2}
            total={100}
            style={{ justifyContent: 'center', marginTop: '10px' }}
            onChange={onChange}
          />
        </Col>
      </Row>
    </div>
  );
};

export default TypeProductPage;
