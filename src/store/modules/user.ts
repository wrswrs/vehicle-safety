import { loginBySecret, loginByUsername, logout } from '@/api/user';
import router, { resetRouter } from '@/router';
import store from '@/store';
import { clearStore, getStore, removeStore, setStore } from '@/utils/util';
import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';

// import { AUTH } from '@/settings';
// import { PermissionModule } from './permission';

/** 用户 { userName, sid } */
export interface UserState {
  userName: string;
  sid?: string;
}

@Module({ dynamic: true, store, name: 'user' })
class UserStore extends VuexModule implements UserState {
  public userName = getStore('userName') || ''

  public sid = getStore('sid') || ''

  @Action({ rawError: true })
  public async Login(userInfo: { username: string; password: string; rememberMe: boolean }) {
    const { username, password, rememberMe } = userInfo;
    const { data } = await loginByUsername(username, password, rememberMe);
    // if (AUTH === 'sid')
    this.SET_TOKEN(data);
    this.SET_USERNAME(username);
    return data;
  }

  @Action({ rawError: true })
  public async LoginWidthSecret(secret: string) {
    const { data: { userInfo = {}, sid = '' } = {} } = await loginBySecret(secret);
    if (sid) {
      this.SET_TOKEN(sid);
      this.SET_USERNAME(userInfo.loginName);
      setStore('sc', secret, true);
      setTimeout(() => { if (router.currentRoute.name === 'login' && console.log('REDIRECT') === undefined) router.replace('/home'); }, 800);
    } else removeStore('sc');
    return sid;
  }

  @Action
  public ResetToken() {
    this.SET_TOKEN('');
  }

  @Action
  public async Logout(redirect = true) {
    await logout();
    resetRouter();
    this.SET_TOKEN('');
    clearStore();
    if (redirect) router.push('/login');
  }

  @Mutation
  public SET_USERNAME(username = '') {
    this.userName = username;
    if (username) setStore('userName', username);
    else removeStore('userName');
  }

  @Mutation
  public SET_TOKEN(token = '') {
    this.sid = token;
    if (token) setStore('sid', token);
    else removeStore('sid');
  }
}

/** [vuex模块] user: 用户登录相关 */
const userStore = getModule(UserStore);
export default userStore;
