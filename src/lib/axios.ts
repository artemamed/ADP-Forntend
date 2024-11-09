import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:5001/api',
    headers:{
        'origin': 'http://localhost:5173',
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})
