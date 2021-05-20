import { message } from 'antd'
import React, { useEffect, useState } from 'react'
import { AuthForm, User } from 'types'
import * as auth from 'utils/auth'
import { request } from 'utils/request'

type Status = 'waiting' | 'no-auth' | 'loading' | 'loaded'

interface AuthContextValue {
  user: User | null
  status: Status
  login: (from: AuthForm) => Promise<void>
  register: (from: AuthForm) => Promise<void>
  logout: () => void
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export const AuthContext = React.createContext<AuthContextValue | null>(null)
AuthContext.displayName = 'AuthContext'

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [status, setStatus] = useState<Status>('waiting')
  const login = (form: AuthForm) => auth.login(form).then(setUser)
  const register = (form: AuthForm) => auth.register(form).then(setUser)
  const logout = () => auth.logout()

  useEffect(() => {
    const token = auth.getToken()
    if (token) {
      setStatus('loading')
      request({
        url: '/me',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          const user = res.data
          setUser({ ...user, token })
          setStatus('loaded')
        })
        .catch(() => {
          message.error('自动登录失败')
          setStatus('no-auth')
        })
    } else {
      setStatus('no-auth')
    }
  }, [])

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, status, login, register, logout, setUser }}
    />
  )
}
