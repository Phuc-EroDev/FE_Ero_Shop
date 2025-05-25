import axios from "axios";

export const getAllProduct = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/product/get-all`, {}, {
        withCredentials: true,
    });
    return res.data;
}
