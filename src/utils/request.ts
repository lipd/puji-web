import axios from 'axios'

export const request = axios.create({
  baseURL: 'http://localhost:3005',
})
