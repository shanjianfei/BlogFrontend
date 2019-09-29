import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index/Index'
import HomeContent from '@/components/page/home/HomeContent'
import CategoryContent from '@/components/page/category/CategoryContent'
import ArticleDetailContent from '@/components/page/articledetail/ArticleDetailContent'
import TimeLine from '@/components/page/timeline/TimeLine'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'

import RSS from '@/components/page/rss/Rss'
import Login from '@/components/page/login/Login'

Vue.use(Router)

const scrollBehavior = function (to, from, savedPosition) {
  if (to.hash) {
    return {
      // 通过 to.hash 的值來找到对应的元素
      selector: to.hash
    }
  }
}

export default function createRouter () {
  return new Router({
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
            path: 'articles/category/:categorylevel1?/:categorylevel2?',
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
    ],
    mode: 'history',
    scrollBehavior
  })
}
