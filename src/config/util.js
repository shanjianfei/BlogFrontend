import {imageBaseUrl} from '@/config/env'

const getImageUrl = (originUrl) => {
  if (imageBaseUrl) {
    return originUrl.replace(/http.+:\d+\//, '')
  } else {
    return originUrl
  }
}

export {
  getImageUrl
}
