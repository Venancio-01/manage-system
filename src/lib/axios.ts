import Axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { message } from 'ant-design-vue'
import { API_URL } from '@/config'
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
  baseURL: API_URL,
  timeout: 1000 * 10,
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
  const response = await axios.request<D>(config)
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
