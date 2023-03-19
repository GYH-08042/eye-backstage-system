import { defineStore } from "pinia";
import { fetchUsersList, fetchUsersToggle } from "@@/apis/usersApi";

const useUsersStore = defineStore('users', {
  state: () => {
    return {
      usersList: [], //用户列表
      usersPage: 1,//用户列表当前页码
      usersSize: 10,//用户列表一页展示数量
      usersCount: 0,//用户总数
      usersTotalPage: 0,//用户列表总页数
      lockedFlag: '',//用户筛选状态
    }
  },
  actions: {
    //获取订单列表
    getUsersList(num, size, status) {
      const obj = {}
      obj.pageNumber = num
      obj.pageSize = size
      status == '' ? '' : obj.lockedFlag = status
      return fetchUsersList(obj).then(res => {
        if (res.status == 200) {
          if (res.data.resultCode == 200) {
            console.log('获取用户列表成功---')
            this.usersList = res.data.data.list
            this.usersCount = res.data.data.totalCount
            this.usersTotalPage = res.data.data.totalPage
          } else {
            console.log('获取用户列表失败---', res.data.message)
          }
        } else {
          console.log('请求获取用户列表失败---', res)
        }
      })
    },
    //修改用户状态
    getUsersToggle(lockStatus, ids) {
      return fetchUsersToggle(lockStatus, ids).then(res => {
        if (res.status == 200) {
          if (res.data.resultCode == 200) {
            console.log('修改用户状态成功---')
            ElMessage.success({ message: res.data.message })
            this.getUsersList(this.usersPage, this.usersSize, this.lockedFlag)//修改成功后更新列表
          } else {
            ElMessage.error({ message: res.data.message })
            console.log('修改用户状态失败---', res.data.message)
          }
        } else {
          console.log('请求修改用户状态失败---', res)
        }
      })
    },
  }
})
export default useUsersStore