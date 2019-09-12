import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index/Index'
import HomeContent from '@/page/home/HomeContent'
import CategoryContent from '@/page/category/CategoryContent'
import ArticleDetailContent from '@/page/articledetail/ArticleDetailContent'
import TimeLine from '@/page/timeline/TimeLine'

import Article from '@/components/article/Article'

import Header from '@/components/Head'
import Footer from '@/components/Footer'

import RSS from '@/page/rss/Rss'
import Login from '@/page/login/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index,
      redirect: '/home',
      children: [
        {
          path: 'home',
          components: {
            header: Header,
            main: HomeContent,
            footer: Footer
          }
        },
        {
          path: 'article',
          name: 'Article',
          components: {
            header: Header,
            main: Article,
            footer: Footer
          }
        },
        {
          path: 'article/:id',
          name: 'ArticleDetailContent',
          components: {
            header: Header,
            main: ArticleDetailContent,
            footer: Footer
          }
        },
        {
          path: 'articles',
          name: 'Articles',
          components: {
            header: Header,
            main: CategoryContent,
            footer: Footer
          }
        },
        {
          path: 'articles/category/:categorylevel1?/:categorylevel2?/:categorylevel3?',
          name: 'ArticleListContent',
          components: {
            header: Header,
            main: CategoryContent,
            footer: Footer
          }
        },
        {
          path: 'timeline',
          name: 'TimeLine',
          components: {
            header: Header,
            main: TimeLine,
            footer: Footer
          }
        }
      ]
    },
    {
      path: '/rss',
      component: RSS
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
