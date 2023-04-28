import { request } from '@/lib/axios'
import { IdNameType } from '@/types'

export const getRegions = (id?: string) => {
  return request<IdNameType[]>({
    url: '/out/getRegion',
    method: 'get',
    params: {
      id
    }
  })
}
