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
function add(params) {
  return axios.post('/products/add', params);
}
function edit(params) {
  // 编辑商品接口
  return axios.put('/products/edit', params);
}

/**
 *查询商品详情
 *
 * @param {*} params
 */
function detail(id) {
  return axios.get(`/products/:${id}`);
}

export default {
  list, remove, add, edit, detail,
};
