import { axiosJWT } from './UserService';

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
  const res = await axiosJWT.get(`${import.meta.env.VITE_BACKEND_API}/order/get-all-by-user/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      token: `Bearer ${access_token}`,
    },
  });
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

export const getOrderDetail = async (orderId, userId, access_token) => {
  console.log(userId);
  const res = await axiosJWT.post(
    `${import.meta.env.VITE_BACKEND_API}/order/detail/${orderId}`,
    { user: userId },
    {
      headers: {
        'Content-Type': 'application/json',
        token: `Bearer ${access_token}`,
      },
    },
  );
  return res.data;
};

export const cancelOrder = async (orderId, access_token, userId = '', orderItems = []) => {
  const res = await axiosJWT.delete(
    `${import.meta.env.VITE_BACKEND_API}/order/cancel/${orderId}`,
    { data: { user: userId, orderItems: orderItems } },
    {
      headers: {
        'Content-Type': 'application/json',
        token: `Bearer ${access_token}`,
      },
    },
  );
  return res.data;
};

export const deleteManyOrder = async (ids, access_token) => {
  const res = await axiosJWT.delete(`${import.meta.env.VITE_BACKEND_API}/order/delete-many`, {
    data: { ids },
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const updateDeliveryStatus = async (orderId, access_token) => {
  const res = await axiosJWT.put(
    `${import.meta.env.VITE_BACKEND_API}/order/delivery/${orderId}`,
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

export const updatePaymentStatus = async (orderId, userId, access_token) => {
  const res = await axiosJWT.put(
    `${import.meta.env.VITE_BACKEND_API}/order/payment/${orderId}`,
    { user: userId },
    {
      headers: {
        'Content-Type': 'application/json',
        token: `Bearer ${access_token}`,
      },
    },
  );
  return res.data;
};
