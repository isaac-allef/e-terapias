import axios from 'axios';

const cancelToken = axios.CancelToken;
const source = cancelToken.source();
export const cancelRequest = () => source.cancel('Request cancelled')

export const api = axios.create({
    baseURL: 'http://localhost:3333/',
});

export const apiSheet = axios.create({
    baseURL: 'http://localhost:3334/',
})

export default api;