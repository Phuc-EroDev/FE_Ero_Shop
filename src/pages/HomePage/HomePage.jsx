import React from 'react';
import TypeProduct from '../../components/TypeProduct/TypeProduct';
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import { WrapperTypeProduct } from './style';
import slider1 from '../../assets/images/slider1.png';
import slider2 from '../../assets/images/slider2.png';
import CardComponent from '../../components/CardComponent/CardComponent';
import NavBarComponent from '../../components/NavBarComponent/NavBarComponent';

const HomePage = () => {
  const arr = ['TV', 'Laptop', 'Phone'];
  return (
    <>
      <div style={{ padding: '0 120px' }}>
        <WrapperTypeProduct>
          {arr.map((item) => {
            return <TypeProduct key={item} name={item} />;
          })}
        </WrapperTypeProduct>
      </div>
      <div id="container" style={{ backgroundColor: '#333131', padding: '0 120px', height: '1000px' }}>
        <SliderComponent arrImages={[slider1, slider2]} />
        <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <CardComponent />
        </div>
        <NavBarComponent />
      </div>
    </>
  );
};

export default HomePage;
