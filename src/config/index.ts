export const API_URL = import.meta.env.DEV ? '/api' : (import.meta.env.VITE_API_URL as string) + '/api'

export const FILE_URL = import.meta.env.DEV ? '/file' : (import.meta.env.VITE_API_URL as string)
