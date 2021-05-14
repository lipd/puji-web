import { User } from 'types'
import { request } from './request'
const localStorageKey = '__auth_provider_token__'

export const getToken = () => localStorage.getItem(localStorageKey)

export const saveUserResponse = (user: User) => {
  localStorage.setItem(localStorageKey, user.token || '')
  return user
}

export const register = (data: { username: string; password: string }) => {
  return request({
    url: '/register',
    method: 'POST',
    data: { name: data.username, password: data.password },
  }).then((res) => {
    const user = res.data
    return saveUserResponse(user)
  })
}

export const login = (data: { username: string; password: string }) => {
  return request({
    url: '/login',
    method: 'POST',
    data: { name: data.username, password: data.password },
  }).then((res) => {
    const user = res.data
    return saveUserResponse(user)
  })
}

export const logout = () => localStorage.removeItem(localStorageKey)
