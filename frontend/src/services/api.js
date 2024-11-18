import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://127.0.0.1:3000',
});

api.interceptors.response.use(
  (response) => {
    const token = response.headers['authorization'];
    if (token) {
      localStorage.setItem('token', token);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  config.headers['Content-Type'] = 'application/json';
  return config;
});

const redeemReward = async (reward_id) => {
  const token = localStorage.getItem('token');
  console.log('token:', token);
  if (!token) {
    throw new Error('No token found');
  }
  const config = {
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'application/json',
    },
  };
  const body = { redemption: { reward_id: reward_id } };
  try {
    const response = await api.post('/v1/users/redemptions', body, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { redeemReward };
export default api;
