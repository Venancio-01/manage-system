import { request } from '@/lib/axios'
import { IdNameType } from '@/types'

export const getDepartments = () => {
  return request<IdNameType[]>({
    url: '/common/getDepts',
    method: 'post'
  })
}
