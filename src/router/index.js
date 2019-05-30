import Vue from 'vue'
import Router from 'vue-router'

import NotFound from '@/views/404'
import Home from '@/views/Home'
// import SearchResult from '@/views/SearchResult'
import HelloWorld from '@/views/HelloWorld'
import Test from '@/views/Main'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/Home/:keyId',
      name: 'HomeId',
      component: Home
    },
    {
      path: '/',
      redirect: {
        path: '/Home'
      }
    },
    {
      path: '/HomePage',
      redirect: {
        path: '/'
      }
    },
    {
      path: '/HomeLogo',
      redirect: {
        path: '/'
      }
    },
    {
      path: '/search',
      redirect: {
        path: '/'
      }
    },
    {
      path: '/helloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/404',
      name: 'NotFoundLink',
      component: NotFound
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/test/:keyId',
      name: 'testId',
      component: Test
    },
    {
      path: '*',
      redirect: {
        path: '/404'
      }
    }
  ]
})
