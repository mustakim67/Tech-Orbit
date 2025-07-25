import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `https://tech-orbit-server.vercel.app`
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;