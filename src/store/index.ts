import { defineStore } from 'pinia'
import { OutingState } from '@/api/outing'
import { IdNameType, MediaType, MediaTypeNames } from '@/types'
import { DisciplineDictionaryType } from '@/api/discipline'

interface State {
  reasons: IdNameType[]
  regions: IdNameType[]
  departments: IdNameType[]
  outingState: OutingState
  accidentTypes: IdNameType[]
  accidentLevels: IdNameType[]
  disciplineTree: DisciplineDictionaryType[]
  mediaTypeNames: MediaTypeNames
}

export const useStore = defineStore('main', {
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'main',
        storage: sessionStorage,
        paths: ['reasons', 'regions', 'departments', 'accidentTypes', 'accidentLevels', 'disciplineTree']
      }
    ]
  },
  state: (): State => {
    return {
      reasons: [],
      regions: [],
      departments: [],
      outingState: {
        0: '归队',
        1: '外出'
      },
      accidentTypes: [],
      accidentLevels: [],
      disciplineTree: [],
      mediaTypeNames: {
        [MediaType.AUDIO]: {
          en: 'audio',
          zh: '音频'
        },
        [MediaType.VIDEO]: {
          en: 'video',
          zh: '视频'
        },
        [MediaType.FILE]: {
          en: 'file',
          zh: '文件'
        },
        [MediaType.IMAGE]: {
          en: 'image',
          zh: '图片'
        }
      }
    }
  },
  getters: {},
  actions: {
    setReasons(reasons: IdNameType[]) {
      this.reasons = reasons
    },
    setRegions(regions: IdNameType[]) {
      this.regions = regions
    },
    setDepartments(departments: IdNameType[]) {
      this.departments = departments
    },
    setAccidentTypes(accidentTypes: IdNameType[]) {
      this.accidentTypes = accidentTypes
    },
    setAccidentLevels(accidentLevels: IdNameType[]) {
      this.accidentLevels = accidentLevels
    },
    setDisciplineTree(disciplineTree: any[]) {
      this.disciplineTree = disciplineTree
    }
  }
})
