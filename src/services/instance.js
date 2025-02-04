import axios from "axios";

const baseURL = "http://localhost:3000/api/v1";

const instance = axios.create({
    baseURL,
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export default instance;