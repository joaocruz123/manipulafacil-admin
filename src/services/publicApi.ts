// api.ts
import axios from 'axios'

const publicApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BFF_PATH_URI,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

export default publicApi