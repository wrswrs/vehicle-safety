import request from '@/utils/request';

/** 用户名密码登录 */
export const loginByUsername = (username: string, password: string, rememberMe = false) => request.get('/login', {
  params: { username: username?.trim(), password: password?.trim(), rememberMe },
});

/** secret登录 */
export const loginBySecret = (secret: string) => request.get('/login2', { params: { secret } });

/** 退出登录 */
export const logout = () => request.post('/loginOut');

// export const getUserInfo = (id: string) => request.post('/user/info', { id });
