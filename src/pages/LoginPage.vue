<script setup>
import { reactive } from 'vue'
import useLoginStore from './useLoginStore.js'

import { useRouter } from 'vue-router'

const store = useLoginStore()
const router = useRouter()

//收集登录表单数据
const loginInfo = reactive({
  userName: '',
  password: '',
})

//点击登录
const onSubmit = async () => {
  await store.getLogin(loginInfo)//调登录接口
  if (localStorage.getItem('token')) {

    router.replace('/desktop')//跳转工作界面
  }
}
</script>

<template>
  <div id="LoginPage">
    <div class="wrapper">
      <div class="color-bar"></div>
      <div class="form">
        <h1>登 录</h1>
        <el-form :model="loginInfo" label-width="55px" hide-required-asterisk>
          <el-form-item label="登录名" required>
            <el-input v-model="loginInfo.userName" />
          </el-form-item>
          <el-form-item label="密码" required>
            <el-input v-model="loginInfo.password" show-password @change="onSubmit" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" color="black" @click="onSubmit">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@keyframes rotate {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

#LoginPage {
  width: 100vw;
  height: 100vh;
  background-image: radial-gradient(ellipse, #3a3938a5, #060606);
  display: flex;
  justify-content: center;
  align-items: center;

  //外层盒子
  .wrapper {
    width: 400px;
    height: 300px;
    overflow: hidden;
    background-color: #05050595;
    position: relative;
    border-radius: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

    //动画条
    .color-bar {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 200px;
      height: 600px;
      background-color: white;
      animation: rotate 5s linear infinite;
    }

    //内层盒子
    .form {
      box-sizing: border-box;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 395px;
      height: 295px;
      background-image: radial-gradient(ellipse, #746d6d, #dfdcdc);
      border-radius: 17.5px;
      overflow: hidden;
      padding: 20px;

      // 表头
      h1 {
        font-size: 22px;
        font-family: 'Microsoft Yahei';
        line-height: 22px;
        margin-bottom: 40px;
        text-align: center;
        color: black;
      }

      // 表单标签
      .el-form-item__label {
        color: black;
        font-weight: 700;
      }

      // 输入框
      .el-form-item__content {
        margin-right: 30px
      }

      // 按钮
      .el-button {
        width: 100%;
        margin-top: 20px;
        height: 35px;
      }
    }
  }
}
</style>