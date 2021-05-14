import { message } from 'antd'
import React, { useEffect, useState } from 'react'
import { User } from 'types'
import * as auth from 'utils/auth'
import { request } from 'utils/request'

interface AuthForm {
  password: string
  username: string
}

interface AuthContextValue {
  user: User | null
  login: (from: AuthForm) => void
  register: (from: AuthForm) => void
  logout: () => void
}

export const AuthContext = React.createContext<AuthContextValue | null>(null)
AuthContext.displayName = 'AuthContext'

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const login = (form: AuthForm) => auth.login(form).then(setUser)
  const register = (form: AuthForm) => auth.register(form).then(setUser)
  const logout = () => auth.logout()

  useEffect(() => {
    const token = auth.getToken()
    if (token) {
      request({
        url: '/me',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          const user = res.data
          setUser(user)
        })
        .catch(() => {
          message.error('自动登录失败')
        })
    }
  }, [])

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  )
}
