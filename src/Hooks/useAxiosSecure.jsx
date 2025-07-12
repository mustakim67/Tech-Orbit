import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
});

const useAxiosSecure = () => {
    axiosSecure.interceptors.request.use(
        (config) => {
            // token add korte hobe ekhane pore
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return axiosSecure;
};

export default useAxiosSecure;
