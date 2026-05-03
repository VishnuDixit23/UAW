import axios from 'axios';

// In development: empty string (Vite proxy handles it)
// In production: points to the deployed Spring Boot backend
const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

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
  const response = await api.post('/api/payment/donation/transactionOnWebsite', paymentData);
  return response.data;
};

export const sendDonationLink = async (paymentData) => {
  const response = await api.post('/api/payment/donation/transactionByLinkSend', paymentData);
  return response.data;
};

export const checkTransactionStatus = async (transactionId) => {
  const response = await api.post('/api/payment/donation/transactionStatus', transactionId, {
    headers: { 'Content-Type': 'text/plain' },
  });
  return response.data;
};

export default api;
