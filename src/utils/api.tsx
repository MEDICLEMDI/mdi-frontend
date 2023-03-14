import axios from 'axios';

const API = axios.create({
  baseURL: 'http://192.168.50.125:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;
