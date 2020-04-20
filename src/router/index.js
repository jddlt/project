import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/index'),
      redirect: '/podao',
      children: [
        {
          path: 'podao',
          // component: () => import('@/pages/pageOne/index')
          component: () => import('@/pages/pageOne/podao')
        },
        {
          path: 'road',
          component: () => import('@/pages/pageOne/road')
        },
        {
          path: 'car',
          component: () => import('@/pages/pageOne/car')
        },
        {
          path: 'cars',
          component: () => import('@/pages/pageOne/cars')
        },
        {
          path: 'station',
          component: () => import('@/pages/pageOne/station')
        },
        {
          path: 'quxian',
          component: () => import('@/pages/pageOne/quxian')
        },
        {
          path: 'compute',
          name: 'compute',
          component: () => import('@/pages/pageTwo/index')
        },
        {
          path: 'run',
          name: 'run',
          component: () => import('@/pages/pageThree/index')
        }
      ]
    }
  ]
})
