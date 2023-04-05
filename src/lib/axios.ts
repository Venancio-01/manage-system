import Axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { message } from 'ant-design-vue'

import { API_URL } from '@/config'
import storage from '@/utils/storage'

type ResponseType<T = any> = {
  code: number
  msg: string
  data: T
}

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
    return Promise.reject(error)
  }
)

export const request = async <T = unknown>(config: AxiosRequestConfig): Promise<ResponseType<T>> => {
  const response = await axios.request<ResponseType<T>>(config)
  return response.data
}
