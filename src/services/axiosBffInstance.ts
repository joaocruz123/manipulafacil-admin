import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BFF_PATH_URI,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const getBearerToken = () => {
  const sessionRoot = JSON.parse(
    window.sessionStorage.getItem('persist:root') || '{}'
  )

  const sessionUser = JSON.parse(sessionRoot.auth || '{}')
  return `Bearer ${sessionUser?.auth.accessToken}`
}

api.interceptors.request.use(
  config => {
    config.headers!['Authorization'] = getBearerToken()
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  response => {
    return response
  },
  async error => {
    const status = error.response.status

    switch (status) {
      case 401:
        throw new Error('Unauthenticated')
      case 400:
        throw new Error('Bab Request')
      case 500:
        throw new Error('Internal Server Error')
      default:
        return Promise.reject(error)
    }
  }
)

export default api