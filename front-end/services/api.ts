import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:3333/',
});

export const apiSheet = axios.create({
    baseURL: 'http://localhost:3334/',
})

export default api;