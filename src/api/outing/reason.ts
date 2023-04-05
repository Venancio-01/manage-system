import { request } from '@/lib/axios'

export type Reason = {
  id: number
  name: string
}

export const getReasons = (id?: string) => {
  return request<Reason[]>({
    url: '/out/getReason',
    method: 'get',
    data: id
  })
}
