import { request } from '@/lib/axios'
import { ListResponseType, PaginationType, TypeIdNumType } from '@/types'

export type DisciplineDictionaryType = {
  createBy: string | null
  createTime: string | null
  updateBy: string | null
  updateTime: string
  remark: string | null
  depIds: string | null
  id: number
  parentId: number
  name: string
  code: string | null
  children: DisciplineDictionaryType[]
}

/**
 * @description: 获取作风纪律字典
 * @return {*}
 */
export const getDisciplineTree = () => {
  return request<DisciplineDictionaryType[]>({
    url: '/discipline/getDisciplineTree',
    method: 'get'
  })
}

export type DisciplineRecord = {
  createBy: null
  createTime: string
  updateBy: null
  updateTime: null
  remark: null
  depIds: null
  disciplineId: number
  deptId: number
  day: string
  userId: number
  deptName: string
}

export type QueryDisciplineParams = PaginationType & {
  deptId?: string
  dayRange?: [string, string] | []
}

export const getDisciplineList = (data: QueryDisciplineParams) => {
  const { dayRange, ...rest } = data
  const postData = {
    'params[startDay]': dayRange.length > 0 ? dayRange[0] : '',
    'params[endDay]': dayRange.length > 0 ? dayRange[1] : '',
    ...rest
  }

  return request<DisciplineRecord[], ListResponseType>({
    url: '/discipline/list',
    method: 'post',
    data: postData,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export type DisciplineDetailRecord = {
  createBy: null
  createTime: string
  updateBy: null
  updateTime: null
  remark: null
  depIds: null
  id: number
  disciplineId: number
  deptId: number
  typeId: number
  num: number
  day: string
}

export const getDisciplineDetail = (id: number) => {
  return request<DisciplineDetailRecord[]>({
    url: '/discipline/detail',
    method: 'get',
    params: { disciplineId: id }
  })
}

export const saveDiscipline = (data: TypeIdNumType[]) => {
  return request<null>({
    url: '/discipline/save',
    method: 'post',
    data
  })
}

export type UpdateDisciplineParams = {
  disciplineId: number
  list: TypeIdNumType[]
}

export const updateDiscipline = (data: UpdateDisciplineParams) => {
  return request<null>({
    url: '/discipline/update',
    method: 'post',
    data
  })
}

export const deleteDiscipline = (id: number) => {
  return request<null>({
    url: '/discipline/delete',
    method: 'post',
    data: { disciplineId: id },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export const getDisciplineStatistics = () => {
  return request<any[]>({
    url: '/discipline/disciplineStatistics',
    method: 'post',
    data: {}
  })
}
