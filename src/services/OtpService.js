import axios from 'axios';

export const axiosJWT = axios.create();

export const sendOtp = async (email) => {
  const res = await axios.post(
    `${import.meta.env.VITE_BACKEND_API}/otp/send-otp`,
    { email },
    {
      withCredentials: true,
    },
  );
  return res.data;
};
