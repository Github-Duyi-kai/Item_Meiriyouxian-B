import axios from '@/axios';

/**
 *
 *
 * @export
 * @param {Object} params {appkey,page,size}
 * @return {*}
 */
export default function (params) {
  return axios.get('/category/all', { params });
}
