import axios from 'axios'

export const request = axios.create({
  baseURL: 'http://api-puji.jiewangji.com/',
})
