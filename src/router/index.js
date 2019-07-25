import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index/Index'
import HomeContent from '@/components/home/HomeContent'
import ArticleDetail from '@/page/article/ArticleDetail'
import TimeLine from '@/page/timeline/TimeLine'
import Articles from '@/page/articlelist/ArticleList'

import Article from '@/components/article/Article'

import Header from '@/components/Head'
import Footer from '@/components/Footer'

import RSS from '@/page/rss/Rss'

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
          components: {
            header: Header,
            main: Article,
            footer: Footer
          }
        },
        {
          path: 'article/:id',
          name: 'ArticleDetail',
          components: {
            header: Header,
            main: ArticleDetail,
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
        },
        {
          path: 'articles',
          name: 'Articles',
          components: {
            header: Header,
            main: Articles,
            footer: Footer
          }
        }
      ]
    },
    {
      path: '/rss',
      component: RSS
    }
  ]
})
