import axios from './axios.js'

//获取轮播图列表
export function fetchCarouselList(params = {}) {
  return axios({
    url: '/manage-api/v1/carousels',
    method: 'get',
    params
  })
}

//修改轮播图信息
export function fetchCarouselEdit(data = {}) {
  return axios({
    url: '/manage-api/v1/carousels',
    method: 'put',
    data
  })
}

//新增轮播图
export function fetchCarouselAdd(data = {}) {
  return axios({
    url: '/manage-api/v1/carousels',
    method: 'post',
    data
  })
}

//批量删除轮播图
export function fetchCarouselDelete(data = {}) {
  return axios({
    url: '/manage-api/v1/carousels',
    method: 'delete',
    data
  })
}

//获取单条轮播图信息
export function fetchCarouselDetail(id) {
  return axios({
    url: `/manage-api/v1/carousels/${id}`,
    method: 'get',
  })
}