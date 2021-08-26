import axios from '@/axios';

/**
 *查询产品列表
 *
 * @export
 * @param {*} params
 * @return {*}
 */
export default function (params) {
  return axios.get('/products/all', { params });
}
