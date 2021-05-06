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
  instrument: string[]
  genre: string[]
  lisence: string[]
  description: string
  favorite: number
  like: number
}
