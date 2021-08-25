import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/layout/Home.vue';
import Login from '@/views/layout/Login.vue';
import store from '@/store';
import permissionRoute from '@/utils/permission';

Vue.use(VueRouter);

// 左侧导航商品的路由信息
/** @type {*} */
/** @type {*} */
const asyncToRouter = [{
  path: '/product',
  name: 'Product',
  component: Home,
  meta: {
    title: '商品',
    hidden: false,
    icon: 'shop',
  },
  children: [{
    path: '/list',
    name: 'ProductList',
    meta: {
      title: '商品列表',
      hidden: false,
      icon: 'bars',
    },
    component: () => import('@/views/page/productList.vue'),
  }, {
    path: '/add',
    name: 'ProductAdd',
    meta: {
      title: '新增商品',
      hidden: false,
      icon: 'plus-circle',
    },
    component: () => import('@/views/page/productAdd.vue'),
  }, {
    path: '/category',
    name: 'Category',
    meta: {
      title: '类目管理',
      hidden: false,
      icon: 'gold',
    },
    component: () => import('@/views/page/category.vue'),
  }],
}];
const routes = [{
  path: '/',
  name: 'Home',
  component: Home,
  meta: {
    title: '首页',
    hidden: false,
    icon: 'home',
  },
  children: [{
    path: '/index',
    name: 'Index',
    meta: {
      title: '统计',
      hidden: false,
      icon: 'number',
    },
    component: () => import('@/views/page/index.vue'),
  }],
},
{
  path: '/login',
  name: 'Login',
  meta: {
    title: '登录',
    hidden: true,
    icon: 'login',
  },
  component: Login,
},
];
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

let isAddRoutes = false;
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (store.state.userInfo.username
            && store.state.userInfo.appkey
            && store.state.userInfo.role) {
      const menuRoutes = permissionRoute(store.state.userInfo.role, routes.concat(asyncToRouter));
      if (!isAddRoutes) {
        store.dispatch('changeMenuRoutes', routes.concat(menuRoutes)).then(() => {
          router.addRoutes(menuRoutes);
          next();
        });
        isAddRoutes = true;
      }
      return next();
    }
    return next('/login');
  }
  return next();
});

export default router;
