import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main/index'
import Key from '@/components/key/index'
import Mouse from '@/components/mouse/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/main',
      name: 'main',
      component: Main
    }, {
      path: '/key',
      component: Key
    }, {
      path: '/mouse',
      component: Mouse
    }
  ]
})
