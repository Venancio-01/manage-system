import Axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { message } from 'ant-design-vue'
import { API_URL, FILE_URL } from '@/config'
import storage from '@/utils/storage'
import { ResponseType } from '@/types'
import { debounce } from 'lodash-es'

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = storage.getToken()
  if (token) {
    config.headers.token = `${token}`
  }

  return config
}

export const axios = Axios.create({
  timeout: 1000 * 300,
  withCredentials: false
})

axios.interceptors.request.use(authRequestInterceptor, error => {
  return Promise.reject(error)
})
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    message.error(error.message)
    // handleDebounceErrorMsg(error.message)
    return Promise.reject(error)
  }
)

// const handleDebounceErrorMsg = debounce(
//   message => {
//     message.error(message)
//   },
//   300,
//   {
//     leading: true
//   }
// )

// const handleLoginInvalidation = debounce(
//   data => {
//     message.error('登录已过期，请重新登录')
//     storage.clearToken()
//     window.location.href = '/#/login'
//     return Promise.reject(data)
//   },
//   300,
//   {
//     leading: true
//   }
// )

export const request = async <T = unknown, D = ResponseType<T>>(config: AxiosRequestConfig): Promise<D> => {
  const parseConfig = {
    ...config,
    url: API_URL + config.url
  }
  const response = await axios.request<D>(parseConfig)
  const data = response.data
  const code = data.code

  // if (code === 511) handleLoginInvalidation(data)
  if (code === 511) {
    message.error('登录已过期，请重新登录')
    storage.clearToken()
    window.location.href = '/#/login'
    return Promise.reject(data)
  }

  return response.data
}

export const download = async (url: string, fileName: string) => {
  const response = await axios.request({
    url: FILE_URL + url,
    method: 'GET',
    responseType: 'blob' // 设置返回数据类型为 blob
  })

  // 创建一个 a 标签，用于下载文件
  const fileUrl = window.URL.createObjectURL(new Blob([response.data]))
  const link = document.createElement('a')
  link.href = fileUrl
  link.setAttribute('download', fileName) // 设置下载文件的文件名
  document.body.appendChild(link)
  link.click()
}
