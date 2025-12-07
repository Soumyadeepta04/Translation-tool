import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Get all translations or search
export const getTranslations = async (searchQuery = '') => {
  const response = await axios.get(`${API_URL}/translations`, {
    params: { search: searchQuery }
  });
  return response.data;
};

// Get single translation by ID
export const getTranslationById = async (id) => {
  const response = await axios.get(`${API_URL}/translations/${id}`);
  return response.data;
};

// Create new translation
export const createTranslation = async (key, english) => {
  const response = await axios.post(`${API_URL}/translations`, {
    key,
    english
  });
  return response.data;
};

// Update translation
export const updateTranslation = async (id, data) => {
  const response = await axios.put(`${API_URL}/translations/${id}`, data);
  return response.data;
};

// Delete translation
export const deleteTranslation = async (id) => {
  const response = await axios.delete(`${API_URL}/translations/${id}`);
  return response.data;
};

// Add new language to translation
export const addLanguage = async (id, languageCode, value) => {
  const response = await axios.post(`${API_URL}/translations/${id}/languages`, {
    languageCode,
    value
  });
  return response.data;
};
