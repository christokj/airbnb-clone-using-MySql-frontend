import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_DOMAIN}/api/v1/user`,
    withCredentials: true,  
});
