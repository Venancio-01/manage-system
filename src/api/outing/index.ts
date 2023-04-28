import { request } from '@/lib/axios'
import { PaginationType, ListResponseType } from '@/types'

export type OutingRecord = {
  createBy: string | null
  createTime: string
  updateBy: string | null
  updateTime: string
  remark: string
  depIds: string | null
  outId: number
  deptId: number
  name: string | null
  rank: string
  province: number
  city: number
  address: string
  typeId: number
  startDay: string
  endDay: string
  returnDay: string
  contact: string
  state: number
  createUser: number
  provinceName: string | null
  cityName: string | null
}

export type SaveOutingRecordParams = {
  name: string
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

export const saveOutingRecord = (data: SaveOutingRecordParams) => {
  return request<null>({
    url: '/out/save',
    method: 'post',
    data
  })
}

export type UpdateOutingRecordParams = SaveOutingRecordParams & {
  outId: number
}

export const updateOutingRecord = (data: UpdateOutingRecordParams) => {
  return request<null>({
    url: '/out/update',
    method: 'post',
    data
  })
}

export const deleteOutingRecord = (id: number) => {
  return request<null>({
    url: '/out/delete',
    method: 'post',
    data: { outId: id },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export type OutingState = {
  0: '归队'
  1: '外出'
}

export type QueryOutingRecordParams = PaginationType & {
  name?: string
  deptId?: string
  startDayRange?: [string, string] | []
  returnDayRange?: [string, string] | []
  state?: keyof OutingState | ''
}

export const getOutingRecords = (data: QueryOutingRecordParams) => {
  const { startDayRange, returnDayRange, ...rest } = data
  const params = {
    ...rest,
    'params[outStart]': startDayRange.length > 0 ? startDayRange[0] : '',
    'params[outEnd]': startDayRange.length > 0 ? startDayRange[1] : '',
    'params[returnStart]': returnDayRange.length > 0 ? returnDayRange[1] : '',
    'params[returnEnd]': returnDayRange.length > 0 ? returnDayRange[1] : ''
  }
  return request<OutingRecord[], ListResponseType>({
    url: '/out/list',
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export type OutingStatistics = {
  deptName: string
  [x: string]: string | number
}

export const getOutStatistics = () => {
  return request<OutingStatistics[]>({
    url: '/out/outStatistics',
    method: 'post',
    data: {}
  })
}

export const cancelLeave = (data: number) => {
  return request<null>({
    url: '/out/report',
    method: 'post',
    data: {
      outId: data
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 获取在外人员数量
export const getOutingPeopleCount = () => {
  return request<unknown[]>({
    url: '/index/outStatistics',
    method: 'get'
  })
}
