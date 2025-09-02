import axios from 'axios';

export const axiosJWT = axios.create();

export const getUserStats = async (access_token) => {
  const res = await axiosJWT.get(`${import.meta.env.VITE_BACKEND_API}/dashboard/stats`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const getUserRegistrationStats = async (access_token, months = 6) => {
  const res = await axiosJWT.get(`${import.meta.env.VITE_BACKEND_API}/dashboard/registration-stats?months=${months}`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const getUserOrderStats = async (access_token, months = 6) => {
  const res = await axiosJWT.get(`${import.meta.env.VITE_BACKEND_API}/dashboard/order-stats?months=${months}`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

// Order Revenue Stats
export const getMonthlyRevenue = async (access_token, year = new Date().getFullYear()) => {
  const res = await axiosJWT.get(`${import.meta.env.VITE_BACKEND_API}/dashboard/monthly-revenue?year=${year}`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const getCurrentMonthRevenue = async (access_token) => {
  const res = await axiosJWT.get(`${import.meta.env.VITE_BACKEND_API}/dashboard/current-month-revenue`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const getProductRevenueStats = async (access_token, year = new Date().getFullYear()) => {
  const res = await axiosJWT.get(`${import.meta.env.VITE_BACKEND_API}/dashboard/product-revenue?year=${year}`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const getRevenueTarget = async (access_token) => {
  const res = await axiosJWT.get(`${import.meta.env.VITE_BACKEND_API}/dashboard/revenue-target`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const getDailyRevenue = async (access_token, month, year) => {
  const res = await axiosJWT.get(
    `${import.meta.env.VITE_BACKEND_API}/dashboard/daily-revenue?month=${month}&year=${year}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    },
  );
  return res.data;
};
