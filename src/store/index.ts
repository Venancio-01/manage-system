import { defineStore } from 'pinia'
import { Region } from '@/api/misc/region'
import { Reason } from '@/api/outing/reason'

interface State {
  reasons: Reason[]
  regions: Region[]
}

export const useStore = defineStore('main', {
  state: (): State => {
    return {
      reasons: [],
      regions: []
    }
  },
  getters: {},
  actions: {
    setReasons(reasons: Reason[]) {
      this.reasons = reasons
    },
    setRegions(regions: Region[]) {
      this.regions = regions
    }
  }
})
