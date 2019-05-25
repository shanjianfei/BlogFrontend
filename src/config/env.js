let baseUrl = 'api/'
let imageBaseUrl = ''

if (process.env.NODE_ENV === 'development') {
  imageBaseUrl = 'http://127.0.0.1:8000/'
} else if (process.env.NODE_ENV === 'production') {
  imageBaseUrl = ''
}
export {
  baseUrl,
  imageBaseUrl
}
