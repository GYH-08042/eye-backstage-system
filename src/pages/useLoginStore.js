import { defineStore } from "pinia";
import { fetchLogin, fetchPasswordChange, fetchInfo, fetchLogout } from "@@/apis/loginApi";
import md5 from 'js-md5'//用于密码加密
import { moreRoutes, router } from '@@/router.js'
import cloneDeep from "lodash.clonedeep";

const useLoginStore = defineStore('login', {
  state: () => {
    return {
      info: {},//管理员信息
      allowedRoutes: [],//有权限访问的路由规则
      removeRoutes: [],//记录添加路由时的回调，待退出登录时调用清除动态路由
      breadCrumb: [],//记录面包屑
      sideWidth: '300px',//侧边导航宽度（折叠后变64px）
      tags: [],//窗口标签
      progress: 0, //加载进度条百分比
      progressShow: false //控制进度条的显示与隐藏
    }
  },
  getters: {
    //面包屑对应的路由路径
    breadCrumbTo() {
      let arr = []
      let string = ''
      this.breadCrumb.map((item) => {
        string += `/${item}`
        arr.push(string)
      })
      return arr
    }
  },
  actions: {
    //调登录接口
    getLogin({ password, userName }) {
      return fetchLogin({ passwordMd5: md5(password), userName }).then(res => {
        if (res.status == 200) {
          if (res.data.resultCode == 200) {
            console.log('登录成功---')
            ElMessage.success({ message: res.data.message })
            localStorage.setItem('token', res.data.data)//存储token
          } else {
            ElMessage.error({ message: res.data.message })
            console.log('登录失败---', res.data.message)
          }
        } else {
          console.log('请求登录不成功---', res)
        }
      })
    },

    //调获取管理员信息接口并存储数据
    getInfo() {
      return fetchInfo().then(res => {
        if (res.status == 200) {
          if (res.data.resultCode == 200) {
            console.log('获取管理员信息成功---')
            this.info = res.data.data//存储信息
            this.getAllowedRoutes(res.data.data.loginUserName)
          } else {
            console.log('获取管理员信息失败---', res.data.message)
          }
        } else {
          console.log('请求获取管理员信息不成功---', res)
        }
      })
    },

    //根据权限添加路由规则
    getAllowedRoutes(name) {
      const allowedRoutes = []
      console.log(moreRoutes)
      moreRoutes.forEach((item1) => {//筛选被允许的路由规则
        if (item1.meta.role.some(role1 => role1 == name)) {
          const route = cloneDeep(item1)//复制一份准备添加路由
          console.log(route)
          route.children = []//子路由需要进一步判断，暂时清空子路由
          item1.children.forEach((item2) => {
            if (item2.meta.role.some(role2 => role2 == name)) {
              route.children.push(item2)
            }
          })
          allowedRoutes.push(route)
        }
      })
      this.allowedRoutes = allowedRoutes
    },

    //调退出登录接口
    getLogout() {
      return fetchLogout().then(res => {
        if (res.status == 200) {
          if (res.data.resultCode == 200) {
            console.log('退出成功---')
            ElMessage.success({ message: '已退出' })
            localStorage.removeItem('token')//清除token
            this.info = {} //清除信息     
            this.tags = []//清除标签
            this.allowedRoutes = []//清除动态路由数据
            this.removeRoutes.forEach(item => { item() })//理由添加动态路由时的回调清除动态路由
            this.removeRoutes = []
            router.replace('/login')
          } else {
            console.log('退出失败---', res.data.message)
          }
        } else {
          console.log('请求退出不成功---', res)
        }
      })
    },

    //调修改密码接口
    getPasswordChange({ newPassword, originalPassword }) {
      return fetchPasswordChange({ newPassword: md5(newPassword), originalPassword: md5(originalPassword) }).then(res => {
        if (res.status == 200) {
          if (res.data.resultCode == 200) {
            console.log('修改密码成功---')
            ElMessage.success({ message: '修改密码成功！' })
          } else {
            console.log('修改密码失败---', res.data.message)
            ElMessage.error({ message: `${res.data.message}，修改密码失败！` })
          }
        } else {
          console.log('请求修改密码不成功---', res)
        }
      })
    },

    //添加标签
    addTags(val) {//主要是从sidebar接收参数，也会在路由守卫中被触发
      const name = val.index.split('/')[val.index.split('/').length - 1]
      const exclude = ['login', 'desktop', 'homeManagement', 'goodsManagement', 'ordersManagement', 'usersManagement', 'Data']
      if (!this.tags.some((item) => { return item.name == name }) && !exclude.some(item => { return item == name })) {//标签数组里没有的才添加，一级二级不用展示标签
        this.tags.push({ name, to: val.index })
      }
    }
  }
})

export default useLoginStore