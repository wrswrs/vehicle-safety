import router from '@/router';
import userStore from '@/store/modules/user';
// import { hideLoading, setTitle, showLoading } from '@/utils/page';
import { Route } from 'vue-router';
import { getStore } from './utils/util';

/** 无需登录的路径列表 */
const permWhiteList = ['/login'];

router.beforeEach((to: Route, from: Route, next: Function) => {
  // showLoading();
  // setTitle(to.meta.title);
  // hideLoading(500);

  if (userStore.sid) next();
  else {
    const secret = getStore('sc');
    if (secret) {
      userStore.LoginWidthSecret(secret).then((r: boolean) => {
        if (!r) next(permWhiteList.includes(to.path) ? undefined : `/login?redirect=${to.fullPath}`);
        else if (to.name === 'login') next('/home');
        else next();
      });
    } else next(permWhiteList.includes(to.path) ? undefined : `/login?redirect=${to.fullPath}`);
  }
});

// router.afterEach((to: Route) => {});
