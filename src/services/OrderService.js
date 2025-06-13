import { axiosJWT } from './UserService';

export const createOrder = async (data, access_token) => {
  console.log(`Access Token: ${access_token}`);
  const res = await axiosJWT.post(`${import.meta.env.VITE_BACKEND_API}/order/create`, data, {
    headers: {
      'Content-Type': 'application/json',
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};
