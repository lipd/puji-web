import { Method } from 'axios'
import { useEffect, useState } from 'react'
import { request } from 'utils/request'

interface requestConfig {
  url: string
  method?: Method
  data?: string
}
export function useRequest(
  { url, method = 'GET', data = '' }: requestConfig,
  initValue: any,
) {
  const [response, setResponse] = useState<any>(initValue)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    request({ url, method, data })
      .then((res) => {
        setResponse(res.data)
        setLoading(false)
      })
      .catch((err) => {
        Promise.reject(err)
      })
  }, [])
  return { res: response, loading }
}
