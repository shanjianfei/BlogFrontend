import axios from 'axios'
import { baseUrl } from '@/config/env'
import router from '../router'

axios.defaults.baseURL = baseUrl

axios.interceptors.request.use(
  config => {
    if (localStorage.currentUser_token) {
      axios.defaults.headers.common['Authorization'] =
        'Token ' + localStorage.currentUser_token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    return Promise.resolve(response)
  },
  error => {
    if (error.response.status === 401) {
      router.push({ path: '/login' })
      return Promise.reject(error.response)
    }
    return Promise.reject(error)
  }
)

const async = (url, method = 'GET', data) => {
  method = method.toUpperCase()
  if (method === 'GET') {
    if (data) {
      url += '?'
      for (let key in data) {
        url += key + '=' + data[key] + '&'
      }
      url = url.slice(0, -1)
    }
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then(response => {
          // loading.close()
          resolve(response.data)
        })
        .catch(error => {
          // loading.close()
          reject(error)
        })
    })
  } else if (method === 'POST') {
    return new Promise((resolve, reject) => {
      axios
        .post(url, data)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          // loading.close()
          reject(error)
        })
    })
  } else if (method === 'PUT') {
    return new Promise((resolve, reject) => {
      axios
        .put(url, data)
        .then(response => {
          // loading.close()
          resolve(response.data)
        })
        .catch(error => {
          // loading.close()
          reject(error)
        })
    })
  }
}

export default async
