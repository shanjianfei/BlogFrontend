import {imageBaseUrl} from '@/config/env'

const getImageUrl = (originUrl) => {
  if (imageBaseUrl && originUrl) {
    return originUrl.replace(/http.+:\d+\//, '')
  } else {
    return originUrl
  }
}

export {
  getImageUrl
}
