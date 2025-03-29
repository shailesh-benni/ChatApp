import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:5001/api",
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Add request interceptor for debugging
axiosInstance.interceptors.request.use(
    (config) => {
        console.log('Request being sent:', {
            url: config.url,
            method: config.method,
            data: config.data
        });
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);