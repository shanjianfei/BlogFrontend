import async from '@/config/async'

// 注册
export const register = params => async('/register/', 'POST', params)

// 登录
export const login = params => async('/login/', 'POST', params)

// 获取博客er信息
export const getBloggerInfo = () => async('/bloggerinfo/')

// 获取所有标签
export const getTags = () => async('/tag/')

// 获取总分类
export const getCategory = () => async('/categorylevel/')

// 获取blog
export const getBlogs = () => async('/blog/')

// 验证博客
export const verifyBlogPassword = (blogId, password) =>
  async('/verifyblogpassword/', 'POST', { blog_id: blogId, password })

// 获取文章列表
export const getArticles = params => async('/article/', 'GET', params)

// 获取文章详情
export const getArticleDetail = (id, psd) =>
  async('/article/' + id + '/?password=' + psd)

// 文章点赞
export const articleLike = id =>
  async('/article/' + id + '/', 'PUT', { like: true })

export const giveLike = articleId =>
  async('/articledetail/' + articleId + '/', 'PUT', {
    like: true,
    author: 'xiao_t'
  })

// 给评论点赞
export const giveLikeToCommnet = data => async('/commentlike/', 'POST', data)
export const getComments = blogId => async('/comment/?article_id=' + blogId)

// 添加评论
export const addComment = data => async('/comment/', 'POST', data)

// 获取评论详细信息
export const getCommentDetail = commentId =>
  async('/comment/' + commentId + '/')
export const getSiteInfo = () => async('/siteinfo/')

export const getRss = () => async('/rss/')

export const getArticleCategory = () => async('/category/')

// 根据条件获取文章列表
export const getArticleList = params => async('/articlelist/', 'GET', params)

// 获取文章列表
export const getArticle = (page, size) =>
  async('/articlelist/', 'GET', {
    page: page || 1,
    size: size || 6
  })

// 获取推荐文章
export const getRecommendArticle = (page, size) =>
  async('/articlelist/', 'GET', {
    isrecommend: 2,
    page: page || 1,
    size: size || 6
  })

// 获取热门文章
export const getHotArticle = (page, size) =>
  async('/article/', 'GET', {
    ordering: '-click',
    page: page || 1,
    size: size || 6
  })

// 获取最新文章
export const getLastedArticle = (page, size) =>
  async('/article/', 'GET', {
    ordering: '-update_time',
    page: page || 1,
    size: size || 6
  })

// 获取置顶文章
export const getTopArticle = (page, size) =>
  async('/articlelist/', 'GET', {
    istop: 2,
    page: page || 1,
    size: size || 6
  })

// 获取时间段内上传的文章
export const getDurationArticle = (minDatetime, maxDatetime, page, size) =>
  async('/articlelist/', 'GET', {
    page: page || 1,
    size: size || 6,
    min_datetime: minDatetime,
    max_datetime: maxDatetime
  })
