import axios from 'axios';

export const get = (params) => {
  return axios.get('/doc', { params });
};

export const add = (params) => {
  return axios.post('/doc', params);
};

export const put = (params) => {
  return axios.put('/doc', params);
};
