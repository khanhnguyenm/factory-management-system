import axios from 'axios';

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

const httpClient = axios.create({
  baseURL: BASE_API_URL || 'http://localhost:5000/api/',
  headers: {
    "content-type": "application/json"
  }
});

export const get = async (endPoint: string, options = {}) => {
  const response = await httpClient.get(endPoint, options);
  return response.data;
};

export const post = async (endPoint: string, params: any) => {
  const response = await httpClient.post(endPoint, params);
  return response.data;
};

export default httpClient;