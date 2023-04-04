import Axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'

import { API_URL } from '@/config'
import storage from '@/utils/storage'

type ResponseType<T> = {
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
  baseURL: API_URL
})

axios.interceptors.request.use(authRequestInterceptor, error => {
  return Promise.reject(error)
})
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export const request = async <T = unknown>(config: AxiosRequestConfig): Promise<ResponseType<T>> => {
  try {
    const { data } = await axios.request<ResponseType<T>>(config)
    console.log('🚀 ~ file: axios.ts:40 ~ request ~ data:', data)
    data.code === 0
      ? console.log(data.msg) // 成功消息提示
      : console.error(data.msg) // 失败消息提示
    return data
  } catch (err) {
    const message = err.message || '请求失败'
    console.error(message) // 失败消息提示
    return {
      code: -1,
      msg: message,
      data: null
    }
  }
}
