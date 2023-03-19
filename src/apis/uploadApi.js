import axios from './axios.js'

//单图上传
export function fetchImgUpload(data = {}) {
  return axios({
    url: '/manage-api/v1/upload/file',
    method: 'post',
    data
  })
}

//多图上传
export function fetchImgsUpload(data = {}) {
  return axios({
    url: '/manage-api/v1/upload/files',
    method: 'post',
    data
  })
}
