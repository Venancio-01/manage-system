export type PaginationType = {
  total?: number
  pageNum?: number
  pageSize?: number
}

export type IdNameType = {
  id: string
  name: string
}

export type CountNameType = {
  count: number
  name: string
}

export type TypeIdNumType = {
  typeId: number
  num: number
}

export enum MediaType {
  AUDIO = 1,
  VIDEO = 2,
  FILE = 3,
  IMAGE = 4
}

export type MediaTypeNames = Record<
  MediaType,
  {
    en: string
    zh: string
  }
>

export type ResponseType<T = any> = {
  code: number
  msg: string
  data: T
}

export type ListResponseType<T = any> = {
  code: number
  msg: string
  rows: T
  total: number
}
