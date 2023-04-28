import { request } from '@/lib/axios'
import { CountNameType, IdNameType, PaginationType, ListResponseType } from '@/types'

/**
 * @description: 获取事故类型
 * @param {string} id 一级事故类型 id
 * @return {*}
 */
export const getAccidentTypes = (id?: string) => {
  return request<IdNameType[]>({
    url: '/accident/getAccidentTypes',
    method: 'get',
    params: { id }
  })
}

/**
 * @description: 获取事故等级
 * @param {string} id
 * @return {*}
 */
export const getAccidentLevels = (id?: string) => {
  return request<IdNameType[]>({
    url: '/accident/getAccidentLevels',
    method: 'get',
    params: { id }
  })
}

export type AccidentRecord = {
  createBy: string | null
  createTime: string
  updateBy: string | null
  updateTime: string
  remark: string
  depIds: string | null
  accidentId: number
  ptypeId: number
  typeId: number
  levelId: number
  unit: string
  day: string
  localNum: number
  insideNum: number
  summary: string
  deptId: number
  createUser: number
  levelName: string
  typeName: string
}

export type QueryAccidentParams = PaginationType & {
  deptId?: string
  dayRange?: [string, string] | []
  unit?: string
}

/**
 * @description: 获取事故列表
 * @param {QueryAccidentParams} data
 * @return {*}
 */
export const getAccidentList = (data: QueryAccidentParams) => {
  const { dayRange, ...rest } = data
  const postData = {
    'params[startDay]': dayRange.length > 0 ? dayRange[0] : '',
    'params[endDay]': dayRange.length > 0 ? dayRange[1] : '',
    ...rest
  }

  return request<AccidentRecord[], ListResponseType>({
    url: '/accident/list',
    method: 'post',
    data: postData,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export type SaveAccidentParams = Partial<AccidentRecord> & {
  typeIds: number[]
}

/**
 * @description: 保存事故信息
 * @param {Partial} data
 * @return {*}
 */
export const saveAccident = (data: SaveAccidentParams) => {
  const { typeIds, ...rest } = data
  const postData = {
    ...rest,
    typeId: typeIds.length > 1 ? typeIds[1] : typeIds[0]
  }
  return request<null>({
    url: '/accident/save',
    method: 'post',
    data: postData
  })
}

/**
 * @description: 获取事故详情
 * @param {number} id 事故 id
 * @return {*}
 */
export const getAccidentDetail = (id: number) => {
  return request<AccidentRecord>({
    url: '/accident/detail',
    method: 'get',
    data: { accidentId: id }
  })
}

export type UpdateAccidentParams = SaveAccidentParams & {
  accidentId: number
}

/**
 * @description: 更新事故信息
 * @param {Partial} data
 * @return {*}
 */
export const updateAccident = (data: UpdateAccidentParams) => {
  const { typeIds, ...rest } = data
  const postData = {
    ...rest,
    typeId: typeIds.length > 1 ? typeIds[1] : typeIds[0]
  }

  return request<null>({
    url: '/accident/update',
    method: 'post',
    data: postData
  })
}

/**
 * @description: 删除事故信息
 * @param {number} id
 * @return {*}
 */
export const deleteAccident = (accidentId: number) => {
  return request<null>({
    url: '/accident/delete',
    method: 'post',
    data: { accidentId },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

/**
 * @description: 获取本月事故类型统计
 * @return {*}
 */
export const getAccidentTypeStatistics = () => {
  return request<CountNameType[]>({
    url: '/index/accidentTypeStatistics',
    method: 'get'
  })
}

/**
 * @description: 获取近期事故通报
 * @return {*}
 */
export const getRecentAccidentList = () => {
  return request<AccidentRecord[]>({
    url: '/index/accidentList',
    method: 'get'
  })
}

export type AccidentPreventionRecommendation = {
  pointer: string
  list: CountNameType[]
}

/**
 * @description: 获取事故预防建议
 * @param {string} typeId
 * @return {*}
 */
export const getAccidentPreventionRecommendations = (typeId?: string) => {
  return request<AccidentPreventionRecommendation>({
    url: '/index/accidentPrevention',
    method: 'get',
    params: { typeId }
  })
}

export type AccidentStatisticsByYear = {
  [key: string]: number
}

/**
 * @description: 获取年度事故统计
 * @param {number} year
 * @return {*}
 */
export const getAccidentStatisticsByYear = (year: number) => {
  return request<AccidentStatisticsByYear[]>({
    url: '/index/accidentStatisticsByMonths',
    method: 'get',
    params: { year }
  })
}

export type AccidentStatisticsByMonth = {
  avgCount: number
  name: string
  count: number
}

/**
 * @description: 获取本月事故统计
 * @return {*}
 */
export const getThisMonthAccidentStatistics = () => {
  return request<AccidentStatisticsByMonth[]>({
    url: '/index/accidentStatistics',
    method: 'get'
  })
}
