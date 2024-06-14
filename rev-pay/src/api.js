import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export const register = (data) => api.post('/users/register', data);
export const login = (data) => api.post('/users/login', data);
export const createAccount = (data, token) =>
  api.post('/accounts/create', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getAccounts = (token) =>
  api.get('/accounts', {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getAccountBalance = (accountId, token) =>
  api.get(`/accounts/${accountId}/balance`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const createTransaction = (data, token) =>
  api.post('/transactions', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getTransactionHistory = (accountId, token) =>
  api.get(`/accounts/${accountId}/transactions`, {
    headers: { Authorization: `Bearer ${token}` },
  });
