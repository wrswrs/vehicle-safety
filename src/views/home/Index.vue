<template>
    <div class="index">
        <v-header />
        <div class="index-main">
            首页
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
