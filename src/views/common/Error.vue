<template>
    <div class="page_404">
        <el-row class="header">
            <el-col
                :span="6"
                :offset="1"
            >
                <el-button
                    plain
                    @click="$router.back"
                >
                    <i class="el-icon-arrow-left" />
                    {{ $t('common.error.back') }}
                </el-button>
            </el-col>
        </el-row>
        <el-row style="margin-top: 10px;">
            <el-col :span="24">
                <h2>{{ message }}</h2>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Error extends Vue {
  message: string = ''

  mounted() {
    let id = parseInt(this.$route.params.id)
    //console.log(this.$route)
    if (id >= 300 && id < 400) {
      this.message = `${id} -${this.$t('common.error.type_1')}`
    } else if (id >= 400 && id < 500) {
      if (id == 403) {
        this.message = `${id} -${this.$t('common.error.type_2')}`
      } else if (id == 404) {
        this.message = `${id} -${this.$t('common.error.type_3')}`
      } else {
        this.message = `${id} -${this.$t('common.error.type_4')}`
      }
    } else if (id >= 500) {
      this.message = `${id} -${this.$t('common.error.type_5')}`
    }
  }
}
</script>

<style lang="scss" scoped>
.page_404 {
  h2 {
    color: $--color-primary;
    text-align: center;
  }
  .header {
    padding: 10px 20px;
    background-color: $--background-color-shallow;
  }
}
</style>
