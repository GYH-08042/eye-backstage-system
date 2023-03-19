import axios from './axios.js'

//获取订单列表
export function fetchOrdersList(params = {}) {
  return axios({
    url: '/manage-api/v1/orders',
    method: 'get',
    params
  })
}

//订单详情接口
export function fetchOrderDetail(orderId) {
  return axios({
    url: `/manage-api/v1/orders/${orderId}`,
    method: 'get'
  })
}

//修改订单状态为配货成功
export function fetchOrdersPrepare(data = {}) {
  return axios({
    url: '/manage-api/v1/orders/checkDone',
    method: 'put',
    data
  })
}

//修改订单状态为已发货
export function fetchOrdersDeliver(data = {}) {
  return axios({
    url: '/manage-api/v1/orders/checkOut',
    method: 'put',
    data
  })
}

//修改订单状态为商家关闭
export function fetchOrdersClose(data = {}) {
  return axios({
    url: '/manage-api/v1/orders/close',
    method: 'put',
    data
  })
}