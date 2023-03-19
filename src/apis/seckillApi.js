import axios from './axios.js'

//获取秒杀配置列表
export function fetchSeckillList(params = { configType: '3' }) {
  return axios({
    url: '/manage-api/v1/indexConfigs',
    method: 'get',
    params
  })
}

//修改秒杀配置
export function fetchSeckillEdit(data = {}) {
  return axios({
    url: '/manage-api/v1/indexConfigs',
    method: 'put',
    data: {
      ...data,
      configType: '3',
    }
  })
}

//新增秒杀配置
export function fetchSeckillAdd(data = {}) {
  return axios({
    url: '/manage-api/v1/indexConfigs',
    method: 'post',
    data: {
      ...data,
      configType: '3',
    }
  })
}

//批量删除秒杀配置
export function fetchSeckillDelete(data = {}) {
  return axios({
    url: '/manage-api/v1/indexConfigs',
    method: 'delete',
    data
  })
}


//获取单条秒杀配置
export function fetchSeckillDetail(id) {
  return axios({
    url: `/manage-api/v1/indexConfigs${id}`,
    method: 'get'
  })
}