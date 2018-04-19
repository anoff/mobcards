import Vue from 'vue'
import Router from 'vue-router'
import Host from '@/components/Host'
import Cards from '@/components/Cards'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Host',
      component: Host
    },
    {
      path: '/cards',
      name: 'Cards',
      component: Cards
    }
  ]
})
