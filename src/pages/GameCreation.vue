<template>
  <main class="game-creation">
    <div
      v-bind:class="[
        globalContrastVariable.applyContrast
          ? 'game-creation-container-contrast'
          : 'game-creation-container',
      ]"
    >
      <div
        v-bind:class="[
          globalContrastVariable.applyContrast
            ? 'game-creation-nav-contrast'
            : 'game-creation-nav',
        ]"
      >
        <h1>Configurações de Jogo</h1>
      </div>

      <form class="game-creation-form">
        <div v-bind:class="[
          globalContrastVariable.applyContrast
            ? 'input-wrapper-contrast'
            : 'input-wrapper',
        ]">
          <p>Email</p>
          <input
            class="email"
            type="text"
            placeholder="exmple@email.com"
            v-model.lazy="email"
          />
          <p class="invalidEmailMsg" style="display: none">Email inválido</p>
        </div>

        <div v-bind:class="[
          globalContrastVariable.applyContrast
            ? 'input-wrapper-contrast'
            : 'input-wrapper',
        ]">
          <p>Apelido</p>
          <input
            class="nick"
            type="text"
            placeholder="John Doe"
            v-model.lazy="nick"
          />
          <p class="invalidNickMsg" style="display: none">Apelido inválido</p>
        </div>

        <div v-bind:class="[
          globalContrastVariable.applyContrast
            ? 'input-wrapper-contrast'
            : 'input-wrapper',
        ]">
          <p>Número máximo de categorias</p>
          <input
            class="categorias"
            type="number"
            min="1"
            name="categorias"
            placeholder="1"
            v-model.lazy="categories"
          /><br />
        </div>

        <div v-bind:class="[
          globalContrastVariable.applyContrast
            ? 'input-wrapper-contrast'
            : 'input-wrapper',
        ]">
          <p>Número máximo de jogadores</p>
          <input
            class="players"
            type="number"
            min="1"
            name="players"
            placeholder="1"
            v-model.lazy="players"
          />
        </div>

        <!-- <div class="timer-wrapper">
            <p>Jogar com limite de tempo</p>
            <input type="checkbox" name="time" v-model="timer">
          </div> -->

        <div class="panel-wrapper">
          <a
            class="btn"
            v-bind:class="[
              globalContrastVariable.applyContrast
                ? 'createContrast'
                : 'create',
            ]"
            @click="createGame"
            >criar jogo</a
          >
          <a
            class="btn"
            v-bind:class="[
              globalContrastVariable.applyContrast ? 'backContrast' : 'back',
            ]"
            @click="back"
            >voltar</a
          >
        </div>
      </form>
    </div>
  </main>
</template>

<script>
import { isEmailValid, isNicknameValid } from "../utils/utils.js";
import * as gameService from "../services/game";
import { shuffle } from "underscore";
import { globalContrastVariable } from "../main.js";
import Swal from "sweetalert2";

export default {
  name: "Create",
  data() {
    return {
      email: "",
      nick: "",
      categories: 1,
      players: 1,
      timer: false,
      globalContrastVariable,
    };
  },

  mounted: () => {
    let email = document.querySelector(".email");
    let nick = document.querySelector(".nick");
    let msgErrorDialog = document.querySelector(".invalidEmailMsg");
    let errorEmailDialog = document.querySelector(".invalidNickMsg");

    nick.addEventListener("focusout", () => {
      !isNicknameValid(nick.value)
        ? (nick.style.marginBottom = "0") &&
          (errorEmailDialog.style.display = "block")
        : (nick.style.marginBottom = "15px") &&
          (errorEmailDialog.style.display = "none");
    });

    email.addEventListener("focusout", () => {
      !isEmailValid(email.value)
        ? (email.style.marginBottom = "0") &&
          (msgErrorDialog.style.display = "block")
        : (email.style.marginBottom = "15px") &&
          (msgErrorDialog.style.display = "none");
    });
  },

  methods: {
    back() {
      return this.$router.push("/");
    },

    createGame() {
      const data = {
        email: this.email,
        nickname: this.nick,
        maxNumberCategories: this.categories,
        maxNumberPlayers: this.players,
        timer: this.timer,
      };

      if (this.players < 2) {
        var translateText = "Número de jogadores inválido!";
        var translateFooter =
          "Verifique o número de jogadores preenchido e tente novamente.";

        Swal.fire({
          icon: "error",
          title: "Opa...",
          text: translateText,
          footer: translateFooter,
        });
      } else if (this.categories < 2) {
        var translateCategoryText = "Número de categorias inválido!";
        var translateCategoryFooter =
          "Verifique o número de categorias solicitadas e tente novamente.";

        Swal.fire({
          icon: "error",
          title: "Opa...",
          text: translateCategoryText,
          footer: translateCategoryFooter,
        });
      } else {
        gameService
          .create(data)
          .then((res) => {
            if (res.status === 201) {
              const gameData = {
                isOwner: true,
                gameID: res.data.gameId,
                playerID: res.data.user,
                letter: res.data.letter,
                status: res.data.status,
                categories: res.data.category,
              };
              for (let i = 0; i < gameData.categories.length; i++) {
                gameData.categories[i].alternative = shuffle(
                  gameData.categories[i].alternative
                );
              }
              sessionStorage.setItem("data", JSON.stringify(gameData));
              sessionStorage.setItem(
                "gameStatus",
                JSON.stringify(res.data.status)
              );
              return this.$router.push("GameRoom");
            }

            if (res.data.message == "Could not create user") {
              Swal.fire({
                icon: "error",
                title: "Opa...",
                text: "Não foi possível criar a sala...",
                footer: "Verifique o usuário e o e-mail informado.",
              });
            }

            console.error(res.data);
          })
          .catch((err) => console.error(err));
      }
    },
  },
};
</script>

<style scoped>
.game-creation-container {
  height: 85vh;
  width: 40vw;
  display: flex;
  flex-direction: column;
  border: 0.5vh solid rgb(75, 114, 83);
  border-radius: 1vh;
  box-shadow: 0 0 15vh rgba(216, 216, 216, 0.52);
  background-color: #ffffff;
  background-image: url("../assets/svg/floating-cogs.svg");
  background-size: 35vh;
}

.game-creation-container-contrast {
  height: 85vh;
  width: 40vw;
  display: flex;
  flex-direction: column;
  border: 0.5vh solid rgb(20, 20, 20);
  border-radius: 1vh;
  box-shadow: 0 0 15vh rgba(24, 24, 24, 0.52);
  background-color: #ffffff;
  background-image: url("../assets/svg/floating-cogs.svg");
  background-size: 35vh;
}

@media only screen and (max-width: 800px) {
  .game-creation-container {
    width: 90vw;
  }
}

.game-creation-nav {
  background-color: rgb(75, 114, 83);
  display: flex;
  justify-content: center;
  color: #ffffff;
  height: 7vh;
  align-items: center;
}

.game-creation-nav-contrast {
  background-color: rgb(15, 15, 15);
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

.panel-wrapper {
  width: 90%;
  height: 15vh;
  margin-top: 5vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.game-creation-nav h1 {
  text-transform: uppercase;
  font-size: 3.5vh;
  font-family: Avenir;
  letter-spacing: 2px;
}

.timer-wrapper p {
  display: inline;
}
h1,
p {
  margin: 0;
}

.game-creation-form {
  height: 93vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 0 0 0.5vh 0.5vh;
  margin-top: 5vh;
}

.game-creation-form .email,
.nick,
.players,
.categorias {
  width: auto;
  height: 3vh;
}

.game-creation-form input {
  padding: 10px;
  box-shadow: 0 0 5px gray;
  margin-top: 5px;
  border-radius: 5px;
  border-left: 5px solid rgb(75, 114, 83) !important;
  border: none;
  -webkit-box-shadow: 0 0 5px gray;
}

.game-creation-form-contrast input {
  padding: 10px;
  box-shadow: 0 0 5px rgb(37, 37, 37);
  margin-top: 5px;
  border-radius: 5px;
  border-left: 5px solid rgb(15, 15, 15) !important;
  border: none;
  -webkit-box-shadow: 0 0 5px gray;
}

.invalidEmailMsg,
.invalidNickMsg {
  color: red;
  margin: 0;
  margin-bottom: 15px;
}

.game-creation {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "HelveticaRounded", Arial, sans-serif;
  color: rgb(75, 114, 83);
  text-align: center;
  background-color: rgba(116, 116, 116, 0.712);
  height: 100%;
  width: 100%;
  position: absolute;
}

.game-creation a {
  font-size: 3vh;
  text-decoration: none;
  text-transform: uppercase;
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

.create {
  color: rgb(75, 114, 83);
  font-family: "HelveticaRounded";
  font-size: 23px;
  cursor: pointer;
  font-weight: lighter;
  background: rgb(146, 196, 161);
  border-bottom: 1.5px solid rgb(75, 114, 83);
}

.createContrast {
  color: rgb(255, 255, 255);
  font-family: "HelveticaRounded";
  font-size: 23px;
  cursor: pointer;
  font-weight: lighter;
  background: rgb(19, 19, 19);
  border-bottom: 1.5px solid rgb(14, 14, 14);
}

.back {
  cursor: pointer;
  color: rgb(75, 114, 83);
  font-family: "HelveticaRounded";
  border: 1px solid rgb(75, 114, 83);
}

.backContrast {
  cursor: pointer;
  color: rgb(255, 255, 255);
  font-family: "HelveticaRounded";
  background: rgb(10, 10, 10);
  border: 1px solid rgb(23, 24, 23);
}

.create:hover {
  background: rgb(180, 240, 198);
}
</style>
