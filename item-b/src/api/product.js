import axios from '@/axios';

/**
 *查询产品列表
 *
 * @export
 * @param {*} params
 * @return {*}
 */
function list(params) {
  return axios.get('/products/all', { params });
}
function remove(params) {
  return axios.delete(`/products/${params.id}`);
}
export default { list, remove };
