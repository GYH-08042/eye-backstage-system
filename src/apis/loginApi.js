import axios from "./axios.js";

//登录
export function fetchLogin(data = {}) {
  return axios({
    url: '/manage-api/v1/adminUser/login',
    method: 'post',
    data
  })
}

// 改密码
export function fetchPasswordChange(data = {}) {
  return axios({
    url: '/manage-api/v1/adminUser/password',
    method: 'put',
    data
  })
}

//获取登录信息
export function fetchInfo() {
  return axios({
    url: '/manage-api/v1/adminUser/profile',
    method: 'get'
  })
}

//退出登录
export function fetchLogout() {
  return axios({
    url: 'manage-api/v1/logout',
    method: 'delete'
  })
}