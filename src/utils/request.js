import axios from 'axios'

const baseURL = 'http://localhost'

const instance = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: true // 启用携带 Cookie
})

export default instance