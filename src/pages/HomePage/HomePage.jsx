import React from 'react';
import TypeProduct from '../../components/TypeProduct/TypeProduct';
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import { WrapperButtonMore, WrapperProducts, WrapperTypeProduct } from './style';
import slider1 from '../../assets/images/slider1.png';
import slider2 from '../../assets/images/slider2.png';
import CardComponent from '../../components/CardComponent/CardComponent';

const HomePage = () => {
  const arr = ['TV', 'Laptop', 'Phone'];
  return (
    <>
      <div style={{ margin: '0 auto', padding: '0 120px' }}>
        <WrapperTypeProduct>
          {arr.map((item) => {
            return <TypeProduct key={item} name={item} />;
          })}
        </WrapperTypeProduct>
      </div>
      <div className="body" style={{ width: '100%', backgroundColor: ' #333131' }}>
        <div id="container" style={{ margin: '0 auto', padding: '0 120px', height: '1000px', width: '100%' }}>
          <SliderComponent arrImages={[slider1, slider2]} />
          <WrapperProducts>
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
          </WrapperProducts>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            <WrapperButtonMore
              textButton="Xem them"
              type="outline"
              style={{
                color: ' #D29B63',
                border: '1px solid #D29B63',
                width: '240px',
                height: '38px',
                fontWeight: '500',
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
