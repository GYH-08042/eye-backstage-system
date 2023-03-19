<script setup>
import useLoginStore from './useLoginStore.js'
import CheckToDo from '@@/components/CheckToDo.vue'

const store = useLoginStore()

</script>
<template>
  <div class="common-layout">
    <el-container>
      <el-aside :width="store.sideWidth">
        <SideBar></SideBar>
      </el-aside>
      <el-container>
        <el-header>
          <HeaderBar></HeaderBar>
        </el-header>
        <el-main>
          <router-view name="module" v-slot="{ Component, route }" style="position:relative;z-index:1" v-loading>
            <transition name="fade" mode="out-in" appear>
              <component :is="Component" :key="route.path" />
            </transition>
          </router-view>
          <CheckToDo></CheckToDo>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss">
.common-layout {
  height: 100%;

  >.el-container {
    width: 100%;
    height: 100%;

    .el-aside {
      overflow-x: hidden;
      background-color: #171717;
      transition: width linear .5s;

      &::-webkit-scrollbar {
        width: 0;
      }

    }

    .el-container {
      height: 100%;
      flex: 1;
      box-sizing: border-box;

      .el-header {
        background-color: #746d6d;
        height: 100px;
        padding: 0;
        width: 100%;
        box-sizing: border-box;
      }

      .el-main {
        flex: 1;
        background-color: white;
        overflow: hidden;
        padding: 0;
        box-sizing: border-box;
        position: relative;

        .desktop {
          position: absolute;
          width: 100%;
          top: 0;
          z-index: 0
        }

      }
    }
  }

}
</style>

<style>
/* transition动画 */
.fade-enter-from,
.fade-leave-to {
  transform: translateX(20px);
  opacity: 0
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.fade-enter-active {
  transition: all 0.3s ease
}

.fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.6, 0.6, 1)
}
</style>