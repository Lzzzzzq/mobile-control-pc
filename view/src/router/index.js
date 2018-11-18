import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main/index'
import Con from '@/components/control/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    }, {
      path: '/control',
      component: Con
    }
  ]
})
