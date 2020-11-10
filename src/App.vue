<template>
    <div id="app">
        <transition name="el-fade-in-linear">
            <keep-alive>
                <RouterView />
            </keep-alive>
        </transition>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  data: any = null

  created() {
    console.log('this.data?.name?.val', this.data?.name?.val)
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
#app {
  height: 100vh;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
