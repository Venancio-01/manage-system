import { request } from '@/lib/axios'
import { IdNameType } from '@/types'

export const getReasons = (id?: string) => {
  return request<IdNameType[]>({
    url: '/out/getReason',
    method: 'get',
    params: { id }
  })
}
