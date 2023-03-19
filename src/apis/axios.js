import Axios from 'axios'
import { ElMessage } from 'element-plus';
import { router } from '@@/router.js';

const axios = Axios.create({
  baseURL: '/api',
  timeout: 50000,
  headers: { 'X-Custom-Header': 'foobar' }
})

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 如果本地有token数据则传入请求头
  if (localStorage.getItem('token')) {
    config.headers.token = localStorage.getItem("token")
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  if (response.data.message == '管理员登录过期！请重新登录！') {
    ElMessage.error({ message: '登陆已超时，请重新登录！' })
    localStorage.removeItem('token')//清除token
    router.replace('/login')
  }
  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default axios