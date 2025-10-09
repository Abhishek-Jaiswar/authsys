import axios from "axios";

const isProduction = import.meta.env.NODE_ENV === 'production';
const baseURL = isProduction
  ? import.meta.env.VITE_API_URL : `http://localhost:${import.meta.env.VITE_PORT}`;

export const api = axios.create({
  baseURL,
  withCredentials: true,
});