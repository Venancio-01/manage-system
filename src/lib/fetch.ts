import { createFetch } from '@vueuse/core'

import { API_URL } from '@/config'
import storage from '@/utils/storage'

type ResponseType<T> = {
  code: number
  msg: string
  data: T
}

const fetch = createFetch({
  baseUrl: API_URL,
  options: {
    timeout: 15000,
    beforeFetch({ options }) {
      const token = storage.getToken()
      if (token) {
        options.headers['token'] = token
      }
      return { options }
    },
    afterFetch({ response, data }: { response: Response; data: ResponseType<unknown> }) {
      return data
    }
  },
  fetchOptions: {
    mode: 'cors', // 允許跨域請求
    credentials: 'omit' // 不發送cookie
  }
})

export default fetch
