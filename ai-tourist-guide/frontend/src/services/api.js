import axios from 'axios';

const API_base = 'http://localhost:8000/api';

export const planTrip = async (tripData) => {
  const response = await axios.post(`${API_base}/plan-trip`, tripData);
  return response.data;
};

export const getNearbyPlaces = async (lat, lng) => {
  const response = await axios.post(`${API_base}/nearby`, { latitude: lat, longitude: lng });
  return response.data;
};

export const translateText = async (text, source, target) => {
  const response = await axios.post(`${API_base}/translate`, { text, source_lang: source, target_lang: target });
  return response.data;
};

export const getHistory = async () => {
  const response = await axios.get(`${API_base}/history`);
  return response.data;
};
