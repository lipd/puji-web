export interface Score {
  _id: number
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
  licenses: string[]
  description: string
  favorites: number
  likes: number
  createdAt: string
  updatedAt: string
  xmlUrl: string
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
