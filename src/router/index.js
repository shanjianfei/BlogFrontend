import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index/Index'
import Home from '@/page/home/Home'
import Article from '@/page/article/ArticleDetail'
import TimeLine from '@/page/timeline/TimeLine'

import Header from '@/components/Head'
import Footer from '@/components/Footer'

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
            main: Home,
            footer: Footer
          }
        },
        {
          path: 'article/:id',
          name: 'ArticleDetail',
          components: {
            header: Header,
            main: Article,
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
    }
  ]
})
