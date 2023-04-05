import { request } from '@/lib/axios'

export type Region = {
  id: string
  name: string
}

export const getRegions = (id?: string) => {
  return request<Region[]>({
    url: '/out/getRegion',
    method: 'post',
    data: id
  })
}
