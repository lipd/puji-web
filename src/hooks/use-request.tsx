import { AxiosRequestConfig } from 'axios'
import { request } from 'utils/request'
import { useAuth } from './use-auth'

export const useRequest = () => {
  const { user } = useAuth()
  return (config: AxiosRequestConfig) => {
    let requestConfig
    if (user?.token) {
      requestConfig = Object.assign(
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
        config,
      )
    } else {
      requestConfig = config
    }
    return request(requestConfig)
  }
}
