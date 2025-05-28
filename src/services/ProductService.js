import axios from "axios";

export const getAllProduct = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/product/get-all`);
    return res.data;
}

export const createProduct = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_API}/product/create`, data);
    return res.data;
}
