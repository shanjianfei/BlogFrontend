import async from '@/config/async'

// 注册
export const register = params => async('/register/', 'POST', params)

// 登录
export const login = params => async('/login/', 'POST', params)

// 获取博客er信息
export const getBloggerInfo = () => async('/bloggerinfo/')

// 获取所有标签
export const getTags = () => async('/tag/')

// 获取总分类及其子分类
export const getCategory = index => async((index ? ('/categorylevel/?index=' + index) : '/categorylevel/'))

// export const getSingleCategory = name => async('/categorylevel/' + name + '/')

// 获取blog
export const getBlogs = (params) => async('/blog/', 'GET', params)

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
export const giveLikeToCommnet = commentId =>
  async('/commentlike/' + commentId + '/', 'PUT', { like: true })

// 获取评论
export const getComments = blogId => async('/comment/?article_id=' + blogId)

// 获取根评论
export const getRootComments = blogId =>
  async('/comment/?article_id=' + blogId + '&is_root=True')

// 添加评论
export const addComment = data => async('/comment/', 'POST', data)

export const getSiteInfo = () => async('/siteinfo/')

export const getRss = () => async('/rss/')
