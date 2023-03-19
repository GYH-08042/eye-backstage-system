import axios from './axios.js'

//获取推荐配置列表
export function fetchRecommendList(params = { configType: '4' }) {
  return axios({
    url: '/manage-api/v1/indexConfigs',
    method: 'get',
    params
  })
}

//修改推荐配置
export function fetchRecommendEdit(data = {}) {
  return axios({
    url: '/manage-api/v1/indexConfigs',
    method: 'put',
    data: {
      ...data,
      configType: '4',
    }
  })
}

//新增推荐配置
export function fetchRecommendAdd(data = {}) {
  return axios({
    url: '/manage-api/v1/indexConfigs',
    method: 'post',
    data: {
      ...data,
      configType: '4',
    }
  })
}

//批量删除推荐配置
export function fetchRecommendDelete(data = {}) {
  return axios({
    url: '/manage-api/v1/indexConfigs',
    method: 'delete',
    data
  })
}


//获取单条推荐配置
export function fetchRecommendDetail(id) {
  return axios({
    url: `/manage-api/v1/indexConfigs${id}`,
    method: 'get'
  })
}