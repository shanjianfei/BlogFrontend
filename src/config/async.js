import axios from 'axios'
import {baseUrl} from '@/config/env'
// import {Loading} from 'element-ui'
import Vue from 'vue'

axios.defaults.baseURL = baseUrl

const async = (url, method = 'GET', data) => {
  let loading = Vue.prototype.$loading({
    lock: true,
    text: '请稍等',
    target: document.querySelector('.loading-text')
  })
  method = method.toUpperCase()
  if (method === 'GET') {
    return new Promise((resolve, reject) => {
      axios.get(url)
        .then((response) => {
          loading.close()
          resolve(response.data)
        })
        .catch(error => {
          loading.close()
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
          loading.close()
          reject(error)
        })
    })
  } else if (method === 'PUT') {
    return new Promise((resolve, reject) => {
      axios.put(url, data)
        .then(response => {
          loading.close()
          resolve(response.data)
        })
        .catch(error => {
          loading.close()
          reject(error)
        })
    })
  }
}

export default async
