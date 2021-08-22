import axios from '@/axios';

export default {
  Login(params) {
    return axios.post('/passport/login', params);
  },
};
