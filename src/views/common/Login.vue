<template>
    <div class="login-container">
        <el-form
            ref="refLoginForm"
            :model="loginForm"
            :rules="loginRules"
            class="login-form"
            auto-complete="on"
        >
            <div class="title-container">
                <h3 class="title">
                    用户登录
                </h3>
            </div>

            <el-form-item prop="username">
                <el-input
                    ref="refUsername"
                    v-model="loginForm.username"
                    type="text"
                    name="username"
                    placeholder="账号"
                    tabindex="1"
                    prefix-icon="el-icon-user"
                    auto-complete="on"
                    :spellcheck="false"
                />
            </el-form-item>

            <el-tooltip
                v-model="capsTooltip"
                content="大写打开!"
                placement="right"
                transition="none"
                manual
            >
                <el-form-item prop="password">
                    <el-input
                        ref="refPassword"
                        v-model="loginForm.password"
                        :type="passwordType"
                        name="password"
                        placeholder="密码"
                        tabindex="2"
                        auto-complete="on"
                        prefix-icon="el-icon-lock"
                        @keyup.native="checkCapslock"
                        @blur="capsTooltip = false"
                        @keyup.enter.native="handleLogin"
                    >
                        <i
                            slot="suffix"
                            class="toggle-password"
                            :class="passwordType === 'password' ? 'el-icon-view' : 'el-icon-cloudy'"
                            @click="togglePwd"
                        />
                    </el-input>
                </el-form-item>
            </el-tooltip>
            <el-form-item
                prop="rememberMe"
                class="remember-me"
            >
                <el-checkbox v-model="loginForm.rememberMe">
                    记住密码
                </el-checkbox>
            </el-form-item>

            <el-button
                class="login-form__submit"
                :loading="loading"
                type="primary"
                @click.native.prevent="handleLogin"
            >
                登录
            </el-button>
        </el-form>
    </div>
</template>

<script lang="ts">
import {
  Component, Vue, Watch, Ref,
} from 'vue-property-decorator';
import { Route } from 'vue-router';
import { Dictionary } from 'vue-router/types/router.d';
import {
  Form, FormItem, Tooltip, Checkbox, Input, Button, Message,
} from 'element-ui';
import userStore from '@/store/modules/user';

[Form, FormItem, Tooltip, Checkbox, Input, Button].forEach((e) => Vue.use(e));

@Component({ name: 'AppLogin' })
export default class AppLogin extends Vue {
  @Ref() private readonly refLoginForm!: Form;

  @Ref() private readonly refUsername!: Input;

  @Ref() private readonly refPassword!: Input;

  private passwordType = 'password'

  private loading = false

  private capsTooltip = false

  private redirect = ''

  private queries: Dictionary<string> = {}

  private loginForm = {
    // username: 'yangsm',
    // password: 'AB12345678c',
    username: '',
    password: '',
    rememberMe: false,
  };

  private loginRules: Record<string, object[]> = {
    username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
    password: [{ required: true, trigger: 'blur', message: '请输入密码' }, {
      max: 43, min: 6, message: '密码长度最短6位', trigger: 'blur',
    }],
  };

  @Watch('$route', { immediate: true })
  private onRouteChange(route: Route) {
    // TODO: remove the "as Dictionary<string>" hack after v4 release for vue-router
    // See https://github.com/vuejs/vue-router/pull/2050 for details
    const { redirect, ...queries } = route.query as Dictionary<string>;
    this.redirect = redirect || '';
    this.queries = queries;
  }

  mounted() {
    if (this.loginForm.username === '') this.refUsername.focus();
    else if (this.loginForm.password === '') this.refPassword.focus();
  }

  /** 检查键盘大写状态 */
  private checkCapslock({ key, shiftKey }: KeyboardEvent) {
    this.capsTooltip = !shiftKey && /^[A-Z]$/.test(key);
  }

  private togglePwd() {
    this.passwordType = this.passwordType === 'password' ? '' : 'password';
    this.$nextTick(() => this.refPassword.focus());
  }

  private handleLogin() {
    this.refLoginForm.validate(async (valid: boolean) => {
      if (!valid) return false;
      this.loading = true;
      try {
        await userStore.Login(this.loginForm);
        this.loading = false;
        this.$router.push({ path: (this.redirect !== '/login' && this.redirect) || '/' }).catch((err) => err);
        console.log('this.$router: ', this.$router);
        return false;
      } catch (e) {
        console.log('e: ', e);
        Message.error({ message: e.message, duration: 3e3 });
        this.loading = false;
        this.$nextTick(() => {
          this.refPassword.focus();
          this.refPassword.select();
        });
        return false;
      }
    });
  }
}
</script>

<style lang="scss">
// 登录页
$light-gray: #eee;
$dark_gray:#889aa4;
$login-bg: #2d3a4b;
$login-cursor-color: #fff;
$--font-size-extra-large: 20px !default;
$--font-size-small: 13px !default;

@supports (-webkit-mask: none) and (not (cater-color: $login-cursor-color)) {
  .login-container .el-input {
    input { color: $login-cursor-color; }
    input::first-line { color: $light-gray; }
  }
}

.login-container {
  @include flexRow;

  flex-flow: column nowrap;
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  background-color: $login-bg;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 40px;
    margin: auto;
    overflow: hidden;
  }

  .el-input input {
    $input-bg: darken($login-bg, 2.5%);
    $input-border: lighten($login-bg, 8%);

    height: 48px;
    padding: 0 12px 0 36px;
    line-height: 1;
    color: $light_gray;
    background: $input-bg;
    border: 1px solid $input-border;
    border-radius: 0;
    -webkit-appearance: none;
    caret-color: $login-cursor-color;

    &:-webkit-autofill {
      box-shadow: 0 0 0 1000px $input-bg inset !important;
      -webkit-text-fill-color: $login-cursor-color !important;
    }
  }

  .title-container .title {
    margin: 0 auto 40px auto;
    font-size: $--font-size-extra-large + 8;
    font-weight: 400;
    color: $light_gray;
    text-align: center;
  }

  .toggle-password {
    padding: 6px 4px;
    font-size: 16px;
    line-height: 36px;
    color: $dark_gray;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;
  }

  .remember-me {
    margin-top: -20px;
    text-align: right;
  }

  .login-form__submit {
    width: 100%;
  }

  footer {
    padding: 8px 10px;
    font-size: $--font-size-small;
    color: $dark_gray;
  }
}
</style>
