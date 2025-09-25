import laptop from './assets/images/typeProduct/laptop.png';
import component from './assets/images/typeProduct/component.png';
import camera from './assets/images/typeProduct/camera.png';
import accessory from './assets/images/typeProduct/accessory.png';
import book from './assets/images/typeProduct/book.png';
import bike from './assets/images/typeProduct/bike.png';
import phone from './assets/images/typeProduct/phone.png';
import household from './assets/images/typeProduct/household.png';
import watch from './assets/images/typeProduct/watch.png';
import other from './assets/images/typeProduct/other.png';

export const orderConstants = {
  shipping: {
    fast: 'FAST',
    ghtk: 'GHTK',
    gojek: 'GO JEK',
  },
  shippingName: {
    fast: 'Giao hàng nhanh',
    ghtk: 'Giao hàng tiết kiệm',
    gojek: 'Giao hàng qua GO JEK',
  },
  payment: {
    cod: 'Thanh toán tiền mặt khi nhận hàng',
    paypal: 'Thanh toán qua PayPal',
  },
};

export const productConstants = {
  productTypeImage: {
    laptop: laptop,
    linhkiện: component,
    máyảnh: camera,
    phụkiện: accessory,
    sách: book,
    xemáy: bike,
    điệnthoại: phone,
    đồgiadụng: household,
    đồnghồ: watch,
    khác: other,
  },
};
