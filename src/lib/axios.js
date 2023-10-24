import axios from 'axios'
import { file2Buffer } from '../helpers/file2Buffer'

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Accept-Language': 'ru'
  }
})

api.uploadImage = async image => {
  const file = await file2Buffer(image)

  const { data } = await api.post('/media', file, {
    headers: {
      Accept: image.type,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })

  return data
}

export default api