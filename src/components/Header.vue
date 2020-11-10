<template>
    <div class="layout-header">
        <div class="title">
            <span
                class="logo"
                @click="gotoHome"
            />
            <span
                style="cursor: pointer;"
                @click="gotoHome"
            >{{ $t('title') }}</span>
        </div>
        <div class="user">
            <div class="user-right">
                <img
                    class="user-img"
                    src="@/assets/images/user.png"
                    alt="user.png"
                >
                <el-dropdown
                    class="user-dropdown"
                    trigger="click"
                >
                    <span>{{ user_info && user_info.username }}</span>

                    <el-dropdown-menu
                        slot="dropdown"
                        style="width: 200px;"
                    >
                        <el-dropdown-item
                            :divided="true"
                            class="logout-btn"
                            @click.native="handleLogout"
                        >
                            <span> <i
                                class="icon-tuichu"
                                style="margin-right: 10px;"
                            />退出 </span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>

                <el-dropdown
                    trigger="click"
                    @command="handleChangeLanguage"
                >
                    <span>
                        {{ $t('Language') }}
                        <i class="el-icon-arrow-down el-icon--right" />
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                            v-if="$i18n.locale !== 'zh-CN'"
                            command="zh-CN"
                        >
                            中文
                        </el-dropdown-item>
                        <el-dropdown-item
                            v-if="$i18n.locale !== 'en'"
                            command="en"
                        >
                            English
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'
// import { logout } from '@/api/common'
// import { uniqBy } from 'lodash'

// const vuexSystem = namespace('System')
@Component
export default class Header extends Vue {
  currentSelectedManageOrgCode: string = ''

  @State user_info
  @State user_auth_orgs
  @State current_selected_manage_org

  @Mutation SET_CURRENT_SELECTED_MANAGE_ORG
  // @Action COMMIT_MOUNT_ROUTER

  handleChangeLanguage(command) {
    console.log('command: ', command)
    this.$i18n.locale = command
  }

  gotoHome() {
    this.$router.push({ name: 'home' })
  }

  handleLogout() {
    this.$store.dispatch('COMMIT_LOGOUT')
  }
}
</script>

<style lang="scss">
.layout-header {
  z-index: 1499;
  box-sizing: border-box;
  display: flex;
  flex: 0 0 $--header-height;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  min-width: 1000px;
  height: $--header-height;
  padding: 0 20px;
  background-color: #fff;
  border-bottom: 2px solid $primary;
  .title {
    display: flex;
    flex: 2 0 400px;
    align-items: center;
    justify-content: flex-start;
    font-size: 18px;
    font-weight: bold;
    color: #000;
    letter-spacing: 2px;
    .logo {
      display: inline-block;
      display: flex;
      flex: 0 0 $--header-height;
      align-items: center;
      justify-content: center;
      max-width: $--header-height;
      height: $--header-height;
      padding-right: 20px;
      cursor: pointer;
      img {
        width: 90%;
        max-width: $--header-height;
        height: 36px;
      }
    }
  }

  .user {
    display: flex;
    flex: 1 1 35%;
    align-items: center;
    justify-content: flex-end;
    height: $--header-height;
    color: $primary;

    .user-current-org {
      flex: 1 0 60%;
      margin-right: 20px;
      // max-width: 300px;
      @include textOverflow;
      .select-manage-org {
        width: calc(100% - 90px);
        input {
          border: none;
          border-bottom: 1px solid #a1a1a1;
          border-radius: 0;
        }
      }
    }
    .user-right {
      display: flex;
      flex: 1 0 180px;
      align-items: center;
      justify-content: flex-end;
      .user-img {
        width: auto;
        height: 40px;
        border-radius: 50%;
      }
    }
    .user-dropdown {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 80px;
      height: 40px;
      color: $primary;
      @include textOverflow;
      &:hover {
        color: $--color-primary;
        // background: $--color-bg;
        cursor: pointer;
      }
      .el-dropdown-selfdefine {
        width: 100%;
        text-align: center;
        @include textOverflow;
      }
    }
  }

  // .el-menu--horizontal > .el-menu-item {
  //   height: 49px;
  //   line-height: 50px;
  // }

  // .el-menu--horizontal > .el-submenu .el-submenu__title {
  //   height: 50px;
  //   line-height: 50px;
  // }
  // .el-dropdown-menu__item {
  //   &.logout-btn {
  //     text-align: center;
  //   }
  //   .header-system-menu-text {
  //     margin-left: 10px;
  //   }
  // }
}
</style>
