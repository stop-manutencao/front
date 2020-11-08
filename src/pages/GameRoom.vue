<template>
  <main>
    <div v-if="!showLetter" v-bind:class="[
              globalContrastVariable.applyContrast
                ? 'gameRoom-contrast'
                : 'gameRoom',
            ]">
      <h1 v-bind:class="[
              globalContrastVariable.applyContrast
                ? 'h1-contrast'
                : '',
            ]">ID do Jogo: {{gameData.gameID}}</h1>

      <h2 v-bind:class="[
              globalContrastVariable.applyContrast
                ? 'h2-contrast'
                : '',
            ]">Jogadores</h2>
      <div class="container">
        <ul>
          <li v-bind:key="player.nickname" v-for="player in players">{{ player.nickname }}</li>
        </ul>
      </div>
      <a v-bind:class="[
              globalContrastVariable.applyContrast
                ? 'init-contrast btn-contrast'
                : 'init btn',
            ]" v-if="gameData.isOwner" @click="startGame">Iniciar Jogo</a>
      <a v-bind:class="[
              globalContrastVariable.applyContrast
                ? 'back-contrast btn-contrast'
                : 'back btn',
            ]" @click="exitGame">Sair</a>
    </div>
    <letterShow v-if="showLetter"/>
  </main>
</template>

<script>
import httpService from '../services/http'
import * as gameService from "../services/game"
import {getGameData} from "../services/game.js"
import LetterShow from "../components/LetterShow"
import io from "socket.io-client"
import { globalContrastVariable } from '../main.js';

export default {
  name: 'GameRoom',
  components: {
    letterShow: LetterShow
  },

  data: () => {
    return {
      players: [],
      showLetter: false,
      gameStatus: JSON.parse(sessionStorage.getItem('gameStatus')),
      gameData: JSON.parse(sessionStorage.getItem('data')),
      socket: io(httpService.baseURL),
      globalContrastVariable,
    }
  },

  mounted() {
    this.listen()
  },


  methods:{
      listen() {
        const self = this

        this.socket.emit("getGame", {
          gameId: this.gameData.gameID
        });

        this.socket.on('users', function (data) {
          self.players = data.players
          self.gameStatus = data.status
        });

        this.socket.on('ownerExit', function (data) {
          self.$router.push('EndGame')
        });

        this.socket.on('gameChanged', function (data) {
          self.showLetter = true
          if(data.status === 'IN_PROGRESS' ){
            setTimeout(() => self.$router.push('game'), 2000)
            sessionStorage.setItem('gameStatus', JSON.stringify(data.status))
          } else if (data.status === 'FINISHED'){
            self.$router.push('GameScore')
          } else {
            self.showLetter = false
            self.$router.push('GameRoom')
          }
        })
      },

     //change the game status at Socket to "in progress and go to next screen"
    startGame() {
      const self = this
      this.socket.emit("changeGameStatus", {
        gameId: self.gameData.gameID,
        status: 'IN_PROGRESS'
      });
    },

    exitGame() {
      const self = this
      this.socket.emit("exit", {
        gameId: self.gameData.gameID,
        playerId: self.gameData.playerID,
        isOwner: self.gameData.isOwner
      });
      return self.$router.push('/')
    }
  }
}
</script>

<style scoped>
h1 {
    font-family: Avenir;
    text-transform: uppercase;
    letter-spacing: 1px;
    background-color: #ffaf43;
    border-top-right-radius: 1vh;
    border-top-left-radius: 1vh;
    padding-top: 5px;
    margin-bottom: 0;
    margin-top: 0;
    color: white;
}

.h1-contrast {
    font-family: Avenir;
    text-transform: uppercase;
    letter-spacing: 1px;
    background-color: #080808;
    border-top-right-radius: 1vh;
    border-top-left-radius: 1vh;
    padding-top: 5px;
    margin-bottom: 0;
    margin-top: 0;
    color: white;
}

.h2-contrast {
    font-family: Avenir;
    text-transform: uppercase;
    letter-spacing: 1px;
    background-color: #030303;
    border-top-right-radius: 1vh;
    border-top-left-radius: 1vh;
    padding-top: 5px;
    margin-bottom: 0;
    margin-top: 0;
    color: white;
}

h2 {
    font-family: HelveticaRounded;
    font-size: 1.6em;
    letter-spacing: 7px;
    text-transform: uppercase;
    background-color: #ffffff;
    width: 80%;
    padding-bottom: 5px;
    margin: auto;
    border-bottom: 0 !important;
    border: 3px solid;
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
    border-radius: 15px;
    margin-top: 4vh;
}

li {
    font-size: 1.4em;
    font-family: Exo2-reg;
    padding: 3px 0 6px 0;
    background-color: #f2f2f2;
}

li:nth-child(even)
{
  text-shadow: 0 0 3vh white;
  color: #bf8434;
  background-color: rgb(210, 210, 210);
}

ul{
  list-style-type: none;
  padding-left: 0;
  margin:auto;
  width: 80%;
  border-left: 3px solid;
  border-right: 3px solid;
}


html {
  height: 100%;
}

.gameRoom h1 {
  text-shadow: 0 0 40px rgb(255, 247, 210);
}

.gameRoom {
  color: #ffaf43;
  text-align: center;
  transform: scale(1.17);
  position: fixed;
  margin-top: 10vh;
  background-color: white;
  border: 2px solid;
  margin: 15vh auto;
  border-radius: 1.5vh;
  width: 80vw;
  left: 0;
  right: 0;
  box-shadow: 0 0 10vh dimgrey;
  overflow: hidden;
  background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 16c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zm33.414-6l5.95-5.95L45.95.636 40 6.586 34.05.636 32.636 2.05 38.586 8l-5.95 5.95 1.414 1.414L40 9.414l5.95 5.95 1.414-1.414L41.414 8zM40 48c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zM9.414 40l5.95-5.95-1.414-1.414L8 38.586l-5.95-5.95L.636 34.05 6.586 40l-5.95 5.95 1.414 1.414L8 41.414l5.95 5.95 1.414-1.414L9.414 40z' fill='%23c7c7c7' fill-opacity='0.19' fill-rule='evenodd'/%3E%3C/svg%3E");
}

.gameRoom-contrast {
  color: #000000;
  text-align: center;
  transform: scale(1.17);
  position: fixed;
  margin-top: 10vh;
  background-color: white;
  border: 2px solid;
  margin: 15vh auto;
  border-radius: 1.5vh;
  width: 80vw;
  left: 0;
  right: 0;
  box-shadow: 0 0 10vh dimgrey;
  overflow: hidden;
  background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 16c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zm33.414-6l5.95-5.95L45.95.636 40 6.586 34.05.636 32.636 2.05 38.586 8l-5.95 5.95 1.414 1.414L40 9.414l5.95 5.95 1.414-1.414L41.414 8zM40 48c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zM9.414 40l5.95-5.95-1.414-1.414L8 38.586l-5.95-5.95L.636 34.05 6.586 40l-5.95 5.95 1.414 1.414L8 41.414l5.95 5.95 1.414-1.414L9.414 40z' fill='%23c7c7c7' fill-opacity='0.19' fill-rule='evenodd'/%3E%3C/svg%3E");
}

.gameRoom a {
  font-size: 3vh;
  text-decoration: none;
  text-transform: uppercase;
}

.btn {
  display: block;
  margin: auto;
  border-radius: 30px;
  padding: 5px;
  width: 30vh;
  transition: 0.5s;
}

.btn-contrast {
  display: block;
  margin: auto;
  border-radius: 30px;
  padding: 5px;
  width: 30vh;
  transition: 0.5s;
}

.btn:hover {
  transition: 0.5s;
  background-color:#febb63;
  text-shadow: 0 0 5vh white;
}

.btn-contrast:hover {
  transition: 0.5s;
  background-color:#070707;
  text-shadow: 0 0 5vh white;
}

.btn:active {
  transition: 0.2s;
}

.init {
  color: white;
  font-family: "HelveticaRounded";
  font-size: 23px;
  background: #ffaf43;
  border-bottom: 1.5px solid #ffaf43;
  margin: auto;
    border-left: 3px solid #ffaf43;
    border-right: 3px solid #ffaf43;
    width: 80%;
    border-top-left-radius: 0 !important;
    border-top-right-radius: 0 !important;
    border-radius: 2vh;
    margin-bottom: 2vh;
    padding-left: 0;
    padding-right: 0;
}

.init-contrast {
  color: white;
  font-family: "HelveticaRounded";
  font-size: 23px;
  background: #181818;
  border-bottom: 1.5px solid #161616;
  margin: auto;
    border-left: 3px solid #161616;
    border-right: 3px solid #161616;
    width: 80%;
    border-top-left-radius: 0 !important;
    border-top-right-radius: 0 !important;
    border-radius: 2vh;
    margin-bottom: 2vh;
    padding-left: 0;
    padding-right: 0;
}

.back:hover {
  background: rgb(255, 241, 50);
}

.back {
  color: rgb(232, 176, 7);
  font-family: "HelveticaRounded";
  font-size: 23px;
  font-weight: lighter;
  background: rgb(255, 245, 102);
  border-bottom: 1.5px solid rgb(232, 176, 7);
  margin-top: 3vh;
  margin-bottom: 2.3vh;
}

.back-contrast {
  color: rgb(255, 255, 255);
  font-family: "HelveticaRounded";
  font-size: 23px;
  font-weight: lighter;
  background: rgb(36, 36, 36);
  border-bottom: 1.5px solid rgb(19, 19, 19);
  margin-top: 3vh;
  margin-bottom: 2.3vh;
}

.back:hover {
  background: rgb(255, 241, 50);
}
</style>
