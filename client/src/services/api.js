import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const fetchImportLogs = () => API.get('/logs');
export const triggerImport = () => API.post('/import');
