import { Api } from './Api';

export const api = new Api({
    baseURL: 'http://localhost:4000/',
    withCredentials: true, // Include credentials (cookies) in request
});