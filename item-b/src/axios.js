import axios from 'axios';
import { message } from 'ant-design-vue';
import store from '@/store';

const instance = axios.create({
  baseURL: 'https://mallapi.duyiedu.com/',
});

// 请求拦截
instance.interceptors.request.use((config) => {
  if (config.url.includes('passport')) {
    return config;
  }
  return {
    ...config,
    params: {
      ...config.params,
      appkey: store.state.userInfo.appkey,
    },
  };
}, (err) => Promise.reject(err));

// 响应拦截
instance.interceptors.response.use((config) => {
  if (config.data.status === 'success') {
    return config.data.data;
  }
  return message.error('密码或用户名错误，登录失败~！');
}, (err) => {
  Promise.reject(err);
});

export default instance;
