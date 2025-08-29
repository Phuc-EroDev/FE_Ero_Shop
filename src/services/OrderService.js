import { axiosJWT } from './UserService';

// export const createOrder = async (id, data, access_token) => {
export const createOrder = async (data, access_token) => {
  const res = await axiosJWT.post(`${import.meta.env.VITE_BACKEND_API}/order/create`, data, {
    headers: {
      'Content-Type': 'application/json',
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const getOrderByUserId = async (id, access_token) => {
  const res = await axiosJWT.get(
    `${import.meta.env.VITE_BACKEND_API}/order/get-order-details/${id}`,
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        token: `Bearer ${access_token}`,
      },
    },
  );
  return res.data;
};

export const getAllOrder = async (access_token) => {
  const res = await axiosJWT.get(`${import.meta.env.VITE_BACKEND_API}/order/getAll`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};
