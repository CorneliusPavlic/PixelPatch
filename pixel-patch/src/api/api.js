import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://127.0.0.1:5000', // Replace with your API base URL
  timeout: 10000, // Optional timeout setting
});

// Add a request interceptor
api.interceptors.request.use(
  async (config) => {
    // Retrieve the access token from localStorage
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or unauthorized
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          // Attempt to refresh the token
          const response = await axios.post(
            'http://127.0.0.1:5000/refresh',
            null,
            {
              headers: { Authorization: `Bearer ${refreshToken}` },
            }
          );
          // Store the new access token
          localStorage.setItem('accessToken', response.data.access_token);

          // Retry the original request with the new token
          error.config.headers.Authorization = `Bearer ${response.data.access_token}`;
          return axios(error.config);
        } catch (refreshError) {
          console.error('Failed to refresh token:', refreshError);
          // Logout the user and redirect to login
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
        }
      } else {
        // Redirect to login if no refresh token
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
