import axios from 'axios';

const API_BASE = 'http://localhost:3000'; // later we will change to real server

export const getUserBalance = async (telegramId) => {
  const res = await axios.post(`${API_BASE}/api/balance`, { telegramId });
  return res.data;
};