import axios from 'axios';

export const get = (params) => {
  return axios.get('/book', { params });
};
export const add = (params) => {
  return axios.post('/book', params);
};
