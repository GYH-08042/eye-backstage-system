<script setup>
import useLoginStore from '@@/pages/useLoginStore'
import { watch } from 'vue';
import { useRouter } from 'vue-router';

const store = useLoginStore()
const router = useRouter()

//工作标签
const toggle = (tag) => {//点击标签切换工作界面
  router.push(tag.to)
}
const close = (tag, index) => {//点击关闭标签
  if (tag.name == store.breadCrumb.slice(-1)[0]) {//如果关闭的当前页面
    store.tags.splice(index, 1)//删除该标签
    if (store.tags.length) {//还有剩余标签就跳转前一个标签
      index == 0 ? router.push(store.tags[0].to) : router.push(store.tags[index - 1].to)
    } else {//否则回到工作台
      router.push('/desktop')
    }
  } else {//不是当前页直接删标签
    store.tags.splice(index, 1)
  }

}

//修改密码
const ifOperate = ref(false)//控制修改表单的显示与隐藏
const ruleFormRef = ref()//表单实例
const checkOrigin = (rule, value, callback) => {//原密码输入框检验
  if (value === '') {
    callback(new Error('请输入原始密码'))
  } else {
    callback()
  }
}
const validatePass = (rule, value, callback) => {//新密码输入框检验
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (ruleForm.checkPass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}
const validatePass2 = (rule, value, callback) => {//确认新密码输入框检验
  if (value === '') {
    callback(new Error('请确认密码！'))
  } else if (value !== ruleForm.pass) {
    callback(new Error("两次密码不一致！"))
  } else {
    callback()
  }
}
const ruleForm = reactive({//表单收集
  origin: '',
  pass: '',
  checkPass: '',
})
const rules = reactive({//定义表单校验规则
  pass: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],
  origin: [{ validator: checkOrigin, trigger: 'blur' }],
})
const submitForm = (ruleFormRef) => {//点击提交
  if (!ruleFormRef) return
  ruleFormRef.validate((valid) => {
    if (valid) {
      store.getPasswordChange({ newPassword: ruleForm.pass, originalPassword: ruleForm.origin })
      console.log('submit!')
      logout()//修改成功后退出登录
    } else {
      console.log('error submit!')
      return false
    }
  })
}
const resetForm = (ruleFormRef) => {//点击重置
  if (!ruleFormRef) return
  ruleFormRef.resetFields()
}
watch(ifOperate, () => { if (ruleFormRef) { resetForm(ruleFormRef.value) } })//每次收起修改密码的表单都要重置为空

//退出登录
const logout = () => {
  store.getLogout()
}
</script>

<template>
  <div class="HeaderBar" separator=">">
    <el-breadcrumb>
      <el-breadcrumb-item v-for="(item, index) in store.breadCrumb" :key="index">
        <router-link v-if="index < store.breadCrumb.length - 1" :to="store.breadCrumbTo[index]"
          v-text="item"></router-link>
        <span v-else v-text="item"></span>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="set">
      <el-popover placement="bottom" :width="280" trigger="click" effect="dark" :teleported="false"
        @hide="ifOperate = false">
        <template #reference>
          <el-avatar :size="40" :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" />
        </template>
        <el-card class="box-card" style="width:250px">
          <template #header>
            <div class="card-header" style="position:relative">
              <span v-text="store.info.loginUserName"></span>
              <el-button class="button" style="position:absolute;right: 0;top:0;margin-left:6px;margin-top:-5px"
                type="warning" @click="logout">退出登录</el-button>
            </div>
          </template>
          <el-button class="button" type="success" @click="ifOperate = !ifOperate" style="margin-bottom:20px;width:100%"
            v-text="ifOperate ? '取消修改' : '修改密码'"></el-button>
          <el-form v-show='ifOperate' ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="68px"
            class="demo-ruleForm">
            <el-form-item label="原密码" prop="origin">
              <el-input v-model="ruleForm.origin" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="新密码" prop="pass">
              <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
              <el-button @click="resetForm(ruleFormRef)">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-popover>

    </div>
  </div>
  <div class="tags">
    <div style="width:100%;height:30px;display: flex;flex-wrap: nowrap;align-items: center;">
      <el-tag v-for="(tag, index) in store.tags" :key="tag.name" class="mx-1" closable
        :type="index % 2 == 0 ? 'success' : 'warning'"
        :style="tag.name == store.breadCrumb.slice(-1)[0] ? 'padding: 14px;' : ''" @click="toggle(tag)"
        @close="close(tag, index)">
        {{ tag.name }}
      </el-tag>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.HeaderBar {
  box-sizing: border-box;
  width: 100%;
  box-sizing: border-box;
  background-color: black;
  height: 60px;
  position: relative;




  //设置栏
  .set {
    position: absolute;
    top: 10px;
    right: 20px;
    background-color: transparent;
    cursor: pointer;
  }

  //面包屑
  .el-breadcrumb {
    font-size: 16px;
    line-height: 16px;
    padding: 20px;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }

    .el-breadcrumb__item .el-breadcrumb__inner {

      //前路径
      a {
        color: white;
        font-weight: 400;

        &:hover {
          color: #409eff;
        }
      }

      //当前路径
      span {
        color: #409eff;
        font-weight: 700;
        padding-right: 60px;
      }

    }
  }
}

//标签
.tags {
  box-sizing: border-box;
  padding: 0 20px;
  height: 40px;
  overflow-y: hidden;
  overflow-x: scroll;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  width: 100%;

  &::-webkit-scrollbar {
    height: 0;
  }

  .el-tag {
    margin-right: 3px;
    cursor: pointer;

    &:hover {
      transform: translateY(-2px)
    }
  }
}
</style>
<style lang="scss">
.setPopper {
  width: 200px;
}
</style>

