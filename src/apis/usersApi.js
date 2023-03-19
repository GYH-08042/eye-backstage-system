import axios from './axios.js'

//获取用户列表
export function fetchUsersList(params = {}) {
  return axios({
    url: '/manage-api/v1/users',
    method: 'get',
    params
  })
}

//修改用户状态
export function fetchUsersToggle(lockStatus, data = {}) {
  return axios({
    url: `/manage-api/v1/users/${lockStatus}`,
    method: 'put',
    data
  })
}

