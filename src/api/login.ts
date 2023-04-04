import { request } from '@/lib/axios'

export type LoginParams = {
  userName: string
  password: string
}

export const login = (params: LoginParams) => {
  return request<string>({
    url: '/login',
    method: 'POST',
    data: params
  })
}
