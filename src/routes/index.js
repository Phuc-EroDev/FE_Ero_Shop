import HomePage from '../pages/HomePage/HomePage';
import ProductsPage from '../pages/ProductsPage/ProductsPage';
import OrderPage from '../pages/OrderPage/OrderPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import TypeProductPage from '../pages/TypeProductPage/TypeProductPage';
import SignInPage from '../pages/SignInPage/SignInPage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage/ForgotPasswordPage';
import ProductDetailsPage from '../pages/ProductDetailsPage/ProductDetailsPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import AdminPage from '../pages/AdminPage/AdminPage';
import PaymentPage from '../pages/PaymentPage/PaymentPage';
import OrderSuccessPage from '../pages/OrderSuccessPage/OrderSuccessPage';
import MyOrderPage from '../pages/MyOrderPage/MyOrderPage';
import OrderDetailPage from '../pages/OrderDetailPage/OrderDetailPage';

export const routes = [
  {
    path: '/',
    page: HomePage,
    isShowHeader: true,
  },
  {
    path: '/products',
    page: ProductsPage,
    isShowHeader: true,
  },
  {
    path: '/order',
    page: OrderPage,
    isShowHeader: true,
  },
  {
    path: '/my-order',
    page: MyOrderPage,
    isShowHeader: true,
  },
  {
    path: '/payment',
    page: PaymentPage,
    isShowHeader: true,
  },
  {
    path: '/order-success',
    page: OrderSuccessPage,
    isShowHeader: true,
  },
  {
    path: '/order-detail',
    page: OrderDetailPage,
    isShowHeader: true,
  },
  {
    path: '/type-product',
    page: TypeProductPage,
    isShowHeader: true,
  },
  // {
  //   path: '/type-product/:type',
  //   page: TypeProductPage,
  //   isShowHeader: true,
  //  },
  {
    path: '/sign-in',
    page: SignInPage,
    isShowHeader: false,
  },
  {
    path: '/sign-up',
    page: SignUpPage,
    isShowHeader: false,
  },
  {
    path: '/forgot-password',
    page: ForgotPasswordPage,
    isShowHeader: false,
  },
  {
    path: '/product-details/:id',
    page: ProductDetailsPage,
    isShowHeader: true,
  },
  {
    path: '/profile-user',
    page: ProfilePage,
    isShowHeader: true,
  },
  {
    path: '/system/admin',
    page: AdminPage,
    isShowHeader: false,
    isPrivate: true, // Only accessible for admin users
  },
  {
    path: '*',
    page: NotFoundPage,
    isShowHeader: false,
  },
];
