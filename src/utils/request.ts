import router from '@/router';
import { AUTH, BASE_URL } from '@/settings';
import userStore from '@/store/modules/user';
import axios, { AxiosRequestConfig, Canceler } from 'axios';
import { Message } from 'element-ui';
// import store from '@/store';

export const enum ResponseCode {
  OK = 200,
  LOGIN_FAIL = 4011,
  NO_LOGIN = 4012,
  NO_PERM = 4013,
}

const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? BASE_URL : '', // 自动加在url前面 (除非绝对路径)
  timeout: 60000, // 请求超时的毫秒数
  withCredentials: AUTH === 'cookie', // 跨域请求时是否需要使用凭证
});

const { CancelToken } = axios;
const cancelHdlCache: Map<AxiosRequestConfig, Canceler> = new Map();

/* eslint-disable no-underscore-dangle, no-param-reassign */
// Request interceptors
axiosInstance.interceptors.request.use(
  AUTH === 'sid' ? (config) => {
    config.cancelToken = new CancelToken((cancel) => cancelHdlCache.set(config, cancel));
    if (userStore.sid) config.headers.__sid = userStore.sid;
    return config;
  } : (config) => {
    config.cancelToken = new CancelToken((cancel) => cancelHdlCache.set(config, cancel));
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptors
axiosInstance.interceptors.response.use(
  (response) => {
    cancelHdlCache.delete(response.config);
    const res = response.data;
    const { code } = res;
    const message = res.msg || res.message || '';
    const { path, fullPath } = router.currentRoute;
    switch (code) {
      case ResponseCode.OK:
        return res;
      case ResponseCode.NO_LOGIN:
        userStore.ResetToken();
        router.push(/^\/\d+\//.test(path) ? { path: '/login' } : { path: '/login', query: { re: fullPath } });
        return res;
      case ResponseCode.NO_PERM:
        return Promise.reject(Object.assign(new Error(message || '无权限'), { response, code }));
      case ResponseCode.LOGIN_FAIL:
        return Promise.reject(Object.assign(new Error(message || '登录失败'), { response, code }));
      default:
        Message.error({ message });
        return Promise.reject(Object.assign(new Error(message), { response, code }));
    }
  }, (error) => {
    if (error?.response?.config) cancelHdlCache.delete(error.response.config);
    if (axios.isCancel(error)) return new Promise(() => console.log('[canceled]'));
    // Message.error({ message: error.message || error.msg });
    console.warn(error.message || error.msg);
    return Promise.reject(error);
  },
);

export default axiosInstance;

export const cancelAllRequests = () => {
  cancelHdlCache.forEach((e) => e && e());
  cancelHdlCache.clear();
};
