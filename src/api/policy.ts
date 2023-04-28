import { request } from '@/lib/axios'
import { ListResponseType, MediaType, PaginationType } from '@/types'
import { UploadFile } from 'ant-design-vue'

export type QueryPolicyParams = PaginationType & {
  name: string
  type?: MediaType
}

export type MsdFile = {
  createBy: null
  createTime: null
  updateBy: null
  updateTime: null
  remark: null
  depIds: null
  fileId: number
  fileName: string
  suffix: null
  path: string
  policyId: null
  fileSize: null
}

export type PolicyRecord = {
  createBy: null
  createTime: string
  updateBy: null
  updateTime: string
  remark: null
  depIds: null
  policyId: number
  userId: number
  deptId: number
  name: string
  type: number
  files: null
  msdFiles: MsdFile[]
}

export const getPolicyList = (data: QueryPolicyParams) => {
  return request<PolicyRecord[], ListResponseType>({
    url: '/policy/list',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export const getPolicyDetail = (id: number) => {
  return request<PolicyRecord>({
    url: '/policy/detail',
    method: 'get',
    params: { policyId: id }
  })
}

export type SavePolicyParams = {
  name: string
  files: UploadFile[]
  type?: MediaType
}

export const savePolicy = (data: SavePolicyParams) => {
  const { files, ...rest } = data
  const postData = {
    ...rest,
    files: files.map(file => file.originFileObj)
  }
  return request<null>({
    url: '/policy/save',
    method: 'post',
    data: postData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const deletePolicy = (id: number) => {
  return request<null>({
    url: '/policy/delete',
    method: 'post',
    data: { policyId: id },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
