import axios from "axios"

export const loginUser = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_API}/user/sign-in`, data);
    return res.data;
}

export const registerUser = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_API}/user/sign-up`, data);
    return res.data;
}

export const getDetailsUser = async (id, access_token) => {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/user/get-details/${id}`, {
        headers: {
            token: `Beare ${access_token}`,
        }
    });
    return res.data;
}