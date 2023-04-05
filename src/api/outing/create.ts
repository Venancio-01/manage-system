import { request } from '@/lib/axios'

export type OutingRecord = {
  rank: string
  province: string
  city: string
  address: string
  typeId: string
  startDay: string
  returnDay: string
  contact: string
  remark: string
}

export const createOutingRecord = (data: OutingRecord) => {
  return request<null>({
    url: '/out/save',
    method: 'post',
    data
  })
}
