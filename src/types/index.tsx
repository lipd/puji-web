export interface Score {
  id: number
  name: string
  uploader: {
    avatar: string
    name: string
  }
  cover: string
  time: string
  author: string
  instruments: string[]
  genres: string[]
  lisences: string[]
  description: string
  favorite: number
  like: number
}

export interface User {
  name: string
  _id: string
  avatar: string
  password: string
  description: string
  token?: string
}

export interface AuthForm {
  username: string
  password: string
}
