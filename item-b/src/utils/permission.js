/**
 *根据整个路由和身份筛选出对应的路由信息
 *
 * @export
 * @param {String} role
 * @param {Array} routes
 */
const allowRoutesName = {
  coustomer: [
    { name: 'Product' },
    { name: 'ProductList' },
    { name: 'ProductAdd' },
    { name: 'ProductEdit' },
  ],
  admin: [
    { name: 'Product' },
    { name: 'ProductList' },
    { name: 'ProductAdd' },
    { name: 'ProductEdit' },
    { name: 'Category' },
  ],
};
/**
 *
 *
 * @export
 * @param {String} role
 * @param {Array} routes
 */
export default function (role, routes) {
  const permissionRoute = allowRoutesName[role].map((item) => item.name);
  const resultRoutes = routes.filter((r) => {
    const obj = r;
    if (permissionRoute.indexOf(r.name) !== -1) {
      const { children } = obj;
      obj.children = children.filter((c) => permissionRoute.indexOf(c.name) !== -1);
      return true;
    }
    return false;
  });
  return resultRoutes;
}
