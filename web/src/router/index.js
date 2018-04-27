import Vue from 'vue'
import Router from 'vue-router'
import Host from '@/components/Host'
import Game from '@/components/Game'
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
      path: '/game',
      name: 'game',
      component: Game
    },
    { path: '/lobby/:id',
      name: 'lobby',
      component: Lobby,
      props: true
    }
  ]
})
