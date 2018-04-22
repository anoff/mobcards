import Vue from 'vue'
import Router from 'vue-router'
import Host from '@/components/Host'
import Cards from '@/components/Cards'
import Lobby from '@/components/Lobby'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'start',
      component: Host
    },
    {
      path: '/cards',
      component: Cards
    },
    { path: '/lobby/:id',
      name: 'lobby',
      component: Lobby,
      props: true
    }
  ]
})
