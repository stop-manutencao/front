<template>
  <main class="join-game">
    <div v-bind:class="[globalContrastVariable.applyContrast ? 'join-game-container-contrast': 'join-game-container']">
      <div v-bind:class="[globalContrastVariable.applyContrast ? 'join-game-nav-contrast': 'join-game-nav']">
        <h1>Entrar no Jogo</h1>
      </div>

      <form autocomplete="on" class="join-game-form">
        <div v-bind:class="[
          globalContrastVariable.applyContrast
            ? 'input-wrapper-contrast'
            : 'input-wrapper',
        ]">
          <p>Email</p>
          <input class="email" type="email" placeholder="email@example.com" required v-model.lazy="email">
          <p class="invalidEmailMsg" style="display:none">Email inválido</p>
        </div>

        <div v-bind:class="[
          globalContrastVariable.applyContrast
            ? 'input-wrapper-contrast'
            : 'input-wrapper',
        ]">
          <p>Apelido</p>
          <input class="nick" type="text" placeholder="John Doe" required v-model.lazy="nick">
          <p class="invalidNickMsg" style="display:none">Apelido inválido</p>
        </div>

        <div v-bind:class="[
          globalContrastVariable.applyContrast
            ? 'input-wrapper-contrast'
            : 'input-wrapper',
        ]">
          <p>ID</p>
          <input autocomplete="off" class="id" type="text" min="0" placeholder="Id do Jogo" required v-model.lazy="id">
        </div>

        <div class="panel-wrapper">
          <a v-bind:class="[globalContrastVariable.applyContrast ? 'btn joinContrast':'btn join']"  @click="joinGame">entrar</a>
          <a v-bind:class="[globalContrastVariable.applyContrast ? 'btn backContrast':'btn contrast']" @click="back">voltar</a>
        </div>

      </form>
    </div>
  </main>
</template>

<script>
import { isEmailValid, isNicknameValid } from "../utils/utils.js"
import * as gameService from "../services/game"
import { shuffle } from 'underscore'
import { globalContrastVariable } from '../main.js';
import Swal from 'sweetalert2'

export default {
  name: "JoinGame",

  data() {
    return {
      id: 0,
      email: "",
      nick: "",
      globalContrastVariable
    }
  },

  mounted: () => {
    let email = document.querySelector(".email")
    let nick = document.querySelector(".nick")
    let msgErrorDialog = document.querySelector(".invalidEmailMsg")
    let errorEmailDialog = document.querySelector(".invalidNickMsg")

    nick.addEventListener("focusout", () => {
      !isNicknameValid(nick.value)
        ? (nick.style.marginBottom = "0") &&
          (errorEmailDialog.style.display = "block")
        : (nick.style.marginBottom = "15px") &&
          (errorEmailDialog.style.display = "none")
    })

    email.addEventListener("focusout", () => {
      !isEmailValid(email.value)
        ? (email.style.marginBottom = "0") &&
          (msgErrorDialog.style.display = "block")
        : (email.style.marginBottom = "15px") &&
          (msgErrorDialog.style.display = "none")
    })
  },

  methods: {
    back() {
      return this.$router.push('/')
    },

    validateData() {
      isEmailValid(document.querySelector(".email").value)
    },

    joinGame() {
      const data = {
        gameId: this.id,
        email: this.email,
        nickname: this.nick
      }

      gameService.signIn(data)
        .then(res => {
          if(res.status === 200 && res.data.status === 'OPEN') {
            const gameData = {
              isOwner: false,
              gameID: res.data.gameId,
              playerID: res.data.user,
              letter: res.data.letter,
              status: res.data.status,
              categories: res.data.category
            }

            for(let i=0; i<gameData.categories.length; i++) {
              shuffle(gameData.categories[i].alternative)
            }

            sessionStorage.setItem('data', JSON.stringify(gameData))
            sessionStorage.setItem('gameStatus', JSON.stringify(res.data.status))
            return this.$router.push('GameRoom')
          }

          Swal.fire({
            icon: 'error',
            title: 'Opa...',
            text: `Já existe alguém com o apelido: ${data.nickname} e e-mail: ${data.email}.`,
            footer: 'Verifique suas credenciais e tente novamente!'
          })
          console.error(res.data)
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>

<style scoped>

.join-game-container{
  height: 87vh;
  width: 40vw;
  display: flex;
  flex-direction: column;
  border: 0.4vh solid rgb(44, 78, 117);
  border-radius: 1vh;
  box-shadow: 0 0 15vh rgba(216, 216, 216, 0.52);
  background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  background-size: 6vh;
}

.join-game-container-contrast{
  height: 87vh;
  width: 40vw;
  display: flex;
  flex-direction: column;
  border: 0.4vh solid rgb(22, 22, 22);
  border-radius: 1vh;
  box-shadow: 0 0 15vh rgba(216, 216, 216, 0.52);
  background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  background-size: 6vh;
}

@media only screen and (max-width: 800px) {
  .join-game-container {
     width: 90vw;
  }
}

.join-game-nav {
    background-color: rgb(44, 78, 117);
    display: flex;
    justify-content: center;
    color: #ffffff;
    height: 7vh;
    align-items: center;
}

.join-game-nav-contrast {
    background-color: rgb(20, 20, 20);
    display: flex;
    justify-content: center;
    color: #ffffff;
    height: 7vh;
    align-items: center;
}

.input-wrapper {
  display: flex;
  flex-direction: column;
  width: 95%;
}

.input-wrapper-contrast {
  display: flex;
  flex-direction: column;
  width: 95%;
  color: black;
}

.panel-wrapper{
  width: 90%;
  height: 15vh;
  margin-top: 5vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.join-game-nav h1{
  text-transform: uppercase;
  font-size: 3.5vh;
  font-family: Avenir;
  letter-spacing: 2px;
}

.join-game-form {
    height: 93vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    border-radius: 0 0 0.5vh 0.5vh;
    box-shadow: inset 0 0 10vh #b7b6b6;
    border: 1px solid #929292;
}

.join-game-form .email,.nick, .id
{
  width: auto;
  height: 3vh;
}

.join-game-form input {
  padding: 10px;
  box-shadow: 0 0 5px gray;
  margin-top: 5px;
  border-radius: 5px;
  border-left: 5px solid rgb(44, 78, 117) !important;
  border: none;
  -webkit-box-shadow: 0 0 5px gray;
}

.invalidEmailMsg, .invalidNickMsg {
  color: red;
  margin: 0;
}

.join-game {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "HelveticaRounded", Arial, sans-serif;
  color: rgb(44, 78, 117);
  text-align: center;
  background-color: rgba(116, 116, 116, 0.712);
  height: 100%;
  width: 100%;
  position: absolute;
}

.join-game a {
  font-size: 3vh;
  text-decoration: none;
  text-transform: uppercase;
}

p{
  margin-bottom:0;
}

.btn {
  display: block;
  border-radius: 30px;
  padding: 5px;
  width: 30vh;
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

.join {
  color: rgb(44, 78, 117);
  font-family: "HelveticaRounded";
  font-size: 23px;
  cursor: pointer;
  font-weight: lighter;
  background: rgb(121, 170, 211);
  border-bottom: 1.5px solid rgb(44, 78, 117);
}

.joinContrast {
  color: rgb(255, 255, 255);
  font-family: "HelveticaRounded";
  font-size: 23px;
  cursor: pointer;
  font-weight: lighter;
  background: rgb(12, 12, 12);
  border-bottom: 1.5px solid rgb(14, 14, 14);
}

.back {
  color: rgb(44, 78, 117);
  cursor: pointer;
  font-family: "HelveticaRounded";
  border: 1px solid rgb(44, 78, 117);
}

.backContrast {
  cursor: pointer;
  color: rgb(255, 255, 255);
  font-family: "HelveticaRounded";
  background: rgb(10, 10, 10);
  border: 1px solid rgb(23, 24, 23);
}

</style>





