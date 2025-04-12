import axios from 'axios';

export const login = (params) => {
  return axios.post('/login', params );
};