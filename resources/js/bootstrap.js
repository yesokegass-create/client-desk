import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.headers.common['Accept'] = 'application/json';

// Add a request interceptor to attach the token
window.axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

// Add a response interceptor to handle 401 errors
window.axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response && (error.response.status === 401 || error.response.status === 419)) {
        // Token is invalid or expired
        localStorage.removeItem('auth_token');
        localStorage.removeItem('vender_user_profile');
        window.location.href = '/login';
    }
    return Promise.reject(error);
});
