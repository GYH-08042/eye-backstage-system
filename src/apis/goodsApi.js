import axios from './axios.js'

//获取商品列表
export function fetchGoodsList(params = {}) {
  return axios({
    url: '/manage-api/v1/goods/list',
    method: 'get',
    params
  })
}

//修改商品信息
export function fetchGoodEdit(data = {}) {
  return axios({
    url: '/manage-api/v1/goods',
    method: 'put',
    data
  })
}

//新增商品信息
export function fetchGoodAdd(data = {}) {
  return axios({
    url: '/manage-api/v1/goods',
    method: 'post',
    data
  })
}

//批量修改销售状态
export function fetchGoodsToggle(sellStatus, data = {}) {
  return axios({
    url: `/manage-api/v1/goods/status/${sellStatus}`,
    method: 'put',
    data
  })
}

//获取单条商品信息
export function fetchGoodDetail(id) {
  return axios({
    url: `/manage-api/v1/goods/${id}`,
    method: 'get',
  })
}
