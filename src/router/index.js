import Vue from 'vue'
import Router from 'vue-router'

import Home from '../pages/Home'
import Game from '../pages/Game'
import GameCreation from '../pages/GameCreation'
import JoinGame from '../pages/JoinGame'
import GameRoom from '../pages/GameRoom'
import GameScore from '../pages/GameScore'
import EndGame from '../pages/EndGame'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'Home', component: Home},
    { path: '/Game', name: 'Game', component: Game},
    { path: '/GameRoom', name: 'GameRoom', component: GameRoom},
    { path: '/Create', name: 'Create',component: GameCreation},
    { path: '/Join', name: 'Join',component: JoinGame},
    { path: '/GameScore', name: 'GameScore',component: GameScore},
    { path: '/EndGame', name: 'EndGame',component: EndGame},
  ]
});
