import axios from 'axios';
import Cookies from 'js-cookie';

// In development: empty string (Vite proxy handles it)
// In production: points to the deployed Spring Boot backend
const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // 👈 Sends cookies (JWT + XSRF) with every request
  headers: {
    'Content-Type': 'application/json',
  },
});

// ─── CSRF Interceptor ───
// Reads the XSRF-TOKEN cookie set by the backend and attaches it as a
// request header on every state-changing request (POST, PUT, DELETE).
// Spring Security's CookieCsrfTokenRepository validates this header.
api.interceptors.request.use(
  (config) => {
    const csrfToken = Cookies.get('XSRF-TOKEN');
    const method = config.method?.toLowerCase();

    if (csrfToken && ['post', 'put', 'delete', 'patch'].includes(method)) {
      config.headers['X-XSRF-TOKEN'] = csrfToken;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ─── User Registration ───
export const registerUser = async (userData) => {
  const response = await api.post('/user/registerUser', userData);
  return response.data;
};

// ─── OTP ───
export const generateOtp = async (mobileNumber) => {
  const response = await api.post('/user/generateOtp', { mobileNumber });
  return response.data;
};

export const verifyOtp = async (mobileNumber, otp) => {
  const response = await api.post('/user/verifyOtp', { mobileNumber, otp });
  return response.data;
};

// ─── Donation / Payment ───
export const initiateWebsitePayment = async (paymentData) => {
  const response = await api.post('/payment/donation/transactionOnWebsite', paymentData);
  return response.data;
};

export const sendDonationLink = async (paymentData) => {
  const response = await api.post('/payment/donation/transactionByLinkSend', paymentData);
  return response.data;
};

export const checkTransactionStatus = async (transactionId) => {
  const response = await api.post('/payment/donation/transactionStatus', transactionId, {
    headers: { 'Content-Type': 'text/plain' },
  });
  return response.data;
};

export const submitCashPayment = async (paymentData) => {
  const response = await api.post('/payment/donation/onCashPayment', paymentData);
  return response.data;
};

// ─── Admin: Donation History ───
export const getDonationHistoryBySort = async (page = 0, size = 10, field = 'createdAt') => {
  const response = await api.post('/payment/donation/history/sort', { page, size, field });
  return response.data;
};

export const getDonationHistoryByPhone = async (page = 0, size = 10, phoneNumber) => {
  const response = await api.post('/payment/donation/history/phone', { page, size, phoneNumber });
  return response.data;
};

export const getDonationHistoryByMode = async (page = 0, size = 10, mode) => {
  const response = await api.post('/payment/donation/history/mode', { page, size, mode });
  return response.data;
};

// ─── CSRF seed call ───
// Call this once on app mount so the backend plants the XSRF-TOKEN cookie.
// Without this first GET, the first POST (generateOtp / registerUser) will
// always be rejected by Spring Security's CSRF filter.
export const seedCsrfToken = () => api.get('/user/hello');

export default api;
