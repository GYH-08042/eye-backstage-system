import axios from './axios.js'

//获取轮播图列表
export function fetchCategoryList(params = {}) {
  return axios({
    url: '/api/v1/categories',
    method: 'get',
    params
  })
}