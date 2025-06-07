import axios from "axios";
import { axiosJWT } from "./UserService";

export const getAllProduct = async (search, limit) => {
    let res = {}
    if (search?.length > 0) {
        res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/product/get-all?filter=name&filter=${search}&limit=${limit}`);
    } else if (limit) {
        res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/product/get-all?limit=${limit}`);
    } else {
        res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/product/get-all`);
    }
    return res.data;
}

export const getDetailsProduct = async (id) => {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/product/get-details/${id}`);
    return res.data;
}

export const getAllTypeProduct = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/product/get-all-type`);
    return res.data;
}

export const getProductType = async (type) => {
    if (type) {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/product/get-all?filter=type&filter=${type}`);
        return res.data;
    }
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

export const deleteProduct = async (id, access_token) => {
    const res = await axiosJWT.delete(`${import.meta.env.VITE_BACKEND_API}/product/delete/${id}`, {}, {
        headers: {
            'Content-Type': 'application/json',
            token: `Bearer ${access_token}`,
        }
    });
    return res.data;
}

export const deleteManyProduct = async (ids, access_token) => {
    const res = await axiosJWT.delete(`${import.meta.env.VITE_BACKEND_API}/product/delete-many`, {
        data: { ids },
        headers: {
            token: `Bearer ${access_token}`,
        }
    });
    return res.data;
}
