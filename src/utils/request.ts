import { message } from 'antd'
import axios from 'axios'
import { logout } from 'utils/auth'
import { constants } from './constants'

const instance = axios.create({
  baseURL: constants.baseUrl,
})

instance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      message.error('登录过期，请重新登录')
      logout()
      window.location.href = '/sign'
      return
    }
    return error
  },
)

export const request = instance
