import axios from "axios";
import { axiosJWT } from "./UserService";

export const getAllProduct = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/product/get-all`);
    return res.data;
}

export const getDetailsProduct = async (id) => {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/product/get-details/${id}`);
    return res.data;
}

export const createProduct = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_API}/product/create`, data);
    return res.data;
}

export const updateProduct = async (id, data, access_token) => {
    const res = await axiosJWT.put(`${import.meta.env.VITE_BACKEND_API}/product/update/${id}`, data, {
        headers: {
            'Content-Type': 'application/json',
            token: `Bearer ${access_token}`,
        }
    });
    return res.data;
}
