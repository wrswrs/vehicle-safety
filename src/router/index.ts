import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

// const asyncViews = require.context('@/views', true, /\.vue$/).keys().map((e) => e.replace(/^\.?\/?(.*)\.vue$/, '$1'));
const builtinViews = ['home'];

const constantRoutes: RouteConfig[] = [
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "dataview" */ '../views/common/Index.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/common/Login.vue'),
    meta: { title: '登录' },
  },
  {
    path: '/404*',
    component: () => import(/* webpackChunkName: "error" */ '../views/common/404.vue'),
    meta: { title: '页面不存在' },
  },
  { // 动态匹配
    path: '/',
    props: true,
    component: () => import(/* webpackChunkName: "dataview" */ '../views/common/Index.vue'),
    redirect: (to) => ({ ...to, name: to.name || '', path: `${to.path.replace(/\/$/, '')}/home` }),
    children: builtinViews.map((k: any) => ({
      name: `${k.name || k}`,
      path: k.name || k,
      meta: { name: k.name || k },
      component: () => import(/* webpackChunkName: "view-chunk" */ `@/views/${k.component || k}.vue`),
    })),
  },
  {
    path: '/*',
    component: () => import(/* webpackChunkName: "error" */ '../views/common/404.vue'),
  },
];

// console.log(constantRoutes[2]);

const createRouter = () => new VueRouter({
  scrollBehavior: (to, from, savedPosition) => (savedPosition || { x: 0, y: 0 }),
  base: process.env.BASE_URL,
  routes: constantRoutes,
});

const router = createRouter();

interface RouterShim extends VueRouter {
  matcher: Record<string, unknown>;
}

// https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  (router as RouterShim).matcher = (newRouter as RouterShim).matcher; // reset router
}

export default router;
