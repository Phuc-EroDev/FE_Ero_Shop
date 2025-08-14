import { axiosJWT } from './UserService';

// export const createOrder = async (id, data, access_token) => {
export const createOrder = async (data, access_token) => {
  const id = '6827c06411e429e5df9873a1';
  const res = await axiosJWT.post(`${import.meta.env.VITE_BACKEND_API}/order/create/${id}`, data, {
    headers: {
      'Content-Type': 'application/json',
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};
