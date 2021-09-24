import axios from 'axios';

const client = axios.create({
    baseURL: process.env.VUE_APP_API_URL || 'http://localhost:5000/api',
});

export default client;