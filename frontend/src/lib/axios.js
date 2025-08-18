import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5005',
    withCredentials: true,
});

export default axiosInstance;
