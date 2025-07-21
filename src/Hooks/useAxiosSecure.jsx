import axios from 'axios';
import { useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router';
import useAuth from './useAuth';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useAuth();

    useEffect(() => {
        const auth = getAuth();

        // Request interceptor to add token
        const requestInterceptor = axiosSecure.interceptors.request.use(
            async (config) => {
                const user = auth.currentUser;
                if (user) {
                    const token = await user.getIdToken();
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Response interceptor to handle errors
        const responseInterceptor = axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) => {
                const status = error.response?.status;

                if (status === 403) {
                    navigate('/forbidden');
                } else if (status === 401) {
                    try {
                        await logOut();
                        navigate('/login');
                    } catch {
                        // Handle logout error if needed
                    }
                }

                return Promise.reject(error);
            }
        );

        // Cleanup interceptors on unmount
        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        };
    }, [navigate, logOut]);

    return axiosSecure;
};

export default useAxiosSecure;
