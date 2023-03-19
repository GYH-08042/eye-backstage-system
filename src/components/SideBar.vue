<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import useLoginStore from '@@/pages/useLoginStore.js'

const store = useLoginStore()
//菜单收缩展开
const isCollapse = ref(false)
const collapse = () => {
  isCollapse.value = !isCollapse.value
  isCollapse.value ? store.$patch({ sideWidth: '64px' }) : store.$patch({ sideWidth: '300px' })
}
//点击二级菜单时右侧添加标签展示
const workOpen = (index) => {
  store.addTags(index)//添加标签
}
</script>

<template>
  <div class="SideBar">
    <!-- 表头 -->
    <div class="logo">
      <span v-show="!isCollapse">爱商城管理系统</span>
      <el-icon @click="collapse">
        <Fold />
      </el-icon>
    </div>
    <!-- 菜单 -->
    <el-menu default-active="0" class="el-menu-vertical-demo" background-color="transparent" text-color="white"
      :collapse="isCollapse" router popper-effect="dark" :collapse-transition="false">
      <!-- 工作台行 -->
      <el-menu-item index="/desktop" route="/desktop">
        <el-icon>
          <Monitor />
        </el-icon>
        <span>工作台</span>
      </el-menu-item>
      <!-- 根据权限动态加载的选项行 -->
      <el-sub-menu v-for="item in store.allowedRoutes" :key="item.meta.id" :index="`${item.path}`" :show-timeout="0"
        :hide-timeout="0" popper-class="sidePopper" :popper-offset="0">
        <!-- 选项标题 -->
        <template #title>
          <el-icon color="white" size="20px">
            <component :is="item.meta.icon" />
          </el-icon>
          <span v-text="item.meta.title"></span>
        </template>
        <!-- 选项子菜单 -->
        <el-menu-item v-for="item2 in item.children" :key="item2.meta.id" :index="`${item2.path}`" @click="workOpen">
          <template #title>
            <el-icon color="white" size="15px">
              <component :is="item2.meta.icon" />
            </el-icon>
            <span v-text="item2.meta.title"></span>
          </template>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<style lang="scss">
.SideBar {
  &::-webkit-scrollbar {
    width: 0;
  }

  // 标题行
  .logo {
    position: sticky;
    top: 0;
    left: 0;
    color: white;
    height: 60px;
    text-align: center;
    overflow: hidden;
    transition: none;
    background-color: black;
    z-index: 3000;

    //文字
    span {
      height: 60px;
      text-align: center;
      font-size: 25px;
      font-weight: 800;
      line-height: 60px;
      font-family: 'microsoft yahei';
      position: relative;

      &::before {
        position: absolute;
        left: -60px;
        top: 0px;
        width: 40px;
        height: 40px;
        content: '';
        background: url('@@/assets/logo.png') no-repeat;
        background-size: 40px 40px;
        border-radius: 15px 3px 15px 3px;

      }
    }

    //折叠按钮
    .el-icon {
      position: absolute;
      right: 16px;
      top: 16px;
      font-size: 30px;

      &:hover {
        color: #409eff;
      }
    }
  }

  // 菜单
  .el-menu {
    border-right: none;

    //工作台选项
    .el-menu-item {
      &:hover {
        background: rgba(128, 128, 128, 0.703);
        color: #40a0ffcb;
      }

      span {
        padding-left: 20px
      }
    }

    //其他选项
    .el-sub-menu {
      &:hover {
        background: rgba(128, 128, 128, 0.703);

        .el-sub-menu__title {
          color: #40a0ffcb !important;
        }
      }

      .el-sub-menu__title {


        span {
          padding-left: 20px;
        }
      }
    }
  }


}

//折叠后的弹窗
body .sidePopper {
  border-radius: 10px;
  background: black;

  >div>ul>li {
    &:hover {
      background: rgba(128, 128, 128, 0.703);
      color: #40a0ffcb;
    }
  }


  // background: #40a0ffcb;


}
</style>
