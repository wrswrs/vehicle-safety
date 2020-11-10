<template>
    <div class="index">
        <v-header class="header" />
        <div class="index-main">
            <keep-alive include="Home">
                <router-view />
            </keep-alive>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import vHeader from '@/components/Header.vue'

@Component({
  components: {
    vHeader,
  },
})
export default class Index extends Vue {
}
</script>

<style lang="scss">
.index {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: $--background-color-shallow;
  > .app-menu {
    z-index: 1499;
    box-sizing: border-box;
    flex: 0 0 45px;
    width: 100%;
    border: none;
  }
  .index-main {
    flex: 1 1 100%;
    width: 100%;
    overflow: hidden;
    .app-menu {
      .el-menu-vertical {
        display: inline-block;
      }
    }
  }
}
</style>
