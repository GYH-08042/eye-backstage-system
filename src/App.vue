<script setup>
import useLoginStore from '@@/pages/useLoginStore';

const store = useLoginStore()

</script>

<template>
  <el-progress :percentage="100" v-show="store.progressShow" :stroke-width="2" :show-text="false"
    :indeterminate="store.progressShow" :duration="3" color="#f56c6c" />
  <router-view name="desktop"></router-view>
</template>

<style lang="scss">
html,
body,
#app {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  //页面加载进度条
  .el-progress {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10000;
  }
}
</style>
