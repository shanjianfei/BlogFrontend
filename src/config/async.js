import axios from 'axios'
import {baseUrl} from '@/config/env'

axios.defaults.baseURL = baseUrl

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
      axios.get(url)
        .then((response) => {
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
      axios.post(url, data)
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
      axios.put(url, data)
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
