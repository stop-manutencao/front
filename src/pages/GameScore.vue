<template>
  <main>
    <div id="gameScore">
      <h1>
        Resultados
      </h1>
      <div class="container">
        <table>
          <tr :key="player.nick" v-for="player in players">
            <th id="nick">{{player.nickname}}</th>
            <th id="score">{{player.score}}</th>
          </tr>
        </table>
        <!-- </li> -->
      </div>
      <a class="btn"  v-bind:class="[
              globalContrastVariable.applyContrast ? 'reload-contrast' : 'reload',
            ]" @click="newGame">Jogar Novamente</a>

    </div>
  </main>
</template>


<script>
import * as gameService from "../services/game"
import { globalContrastVariable } from "../main.js";

// v-if="gameData.isOwner"
export default {
  name: 'GameScore',

  data: () => {
    return {
      players: [],
      gameData: JSON.parse(sessionStorage.getItem('data')),
      globalContrastVariable
    }
  },

  mounted() {
    this.getScore()
  },

  methods: {
    newGame() {
      this.$router.push('/')
    },
    getScore() {
      const gameId = this.gameData ? this.gameData.gameID : ''

      gameService.getScore(gameId)
        .then(res => {
          console.log(res)
          this.players = res.data
        })
        .catch()
    }
  }
}
</script>

<style scoped>
h1 {
  margin-top: 8%;
  margin-bottom: 3%;
}

table {
  border-collapse: collapse;
  margin: auto;
  width: 22%;
}

tr{
  font-size: 145%;
}

#nick {
  border: 1px solid rgb(51,51,51);
  text-align: left;
  padding: 8px;
}

#score {
  border: 1px solid rgb(51,51,51);
  text-align: right;
  padding: 8px;
}


html {
  height: 100%;
}

#gameScore {
  font-family: "HelveticaRounded", Arial, sans-serif;
  color: rgb(224, 224, 224);
  background: rgb(51,51,51);
  text-align: center;
  transform: scale(1.17);
  position: fixed;
  margin-top: 7vh;
  left: 0;
  right: 0;
  height: 100%;
}

#gameScore a {
  font-size: 3vh;
  text-decoration: none;
  text-transform: uppercase;
}

.btn {
  display: block;
  margin: auto;
  border-radius: 5vh;
  padding: 9px;
  padding-left: 0;
  padding-right: 0;
  width: 35vh;
  transition: 0.5s;
}

.btn:hover {
  transition: 0.5s;
  transform: scale(1.09);
}

.btn:active {
  transition: 0.2s;
  transform: scale(0.95);
}

.reload {
  color: rgb(224, 224, 224);
  font-family: "HelveticaRounded";
  font-size: 23px;
  font-weight: lighter;
  background: #ff9200;
  border-bottom: 3px solid rgb(255, 181, 70);
  margin-top: 3vh;
  margin-bottom: 2.3vh;
}

.reload-contrast {
  color: rgb(255, 255, 255);
  font-family: "HelveticaRounded";
  font-size: 23px;
  font-weight: lighter;
  background: #080808;
  border-bottom: 3px solid rgb(235, 235, 235);
  margin-top: 3vh;
  margin-bottom: 2.3vh;
}

</style>
