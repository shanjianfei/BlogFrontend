import async from '@/config/async'

export const getArticleList = (data) => async(data ? ('/articlelist/?' + data) : '/articlelist')
export const getTagList = () => async('/taglist')
export const getArticleDetail = (id) => async('/articledetail/' + id + '/')
export const giveLike = (id) => async('/articledetail/' + id + '/', 'PUT', {like: true, author: 'xiao_t'})
export const getComments = (articleId) => async('comment/?article_id=' + articleId)
export const addComment = (data) => async('comment/', 'POST', data)
export const getSiteInfo = () => async('/siteinfo')
