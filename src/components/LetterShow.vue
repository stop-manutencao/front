
<template>
  <main>
    <main id="letter">
      <h1><b>{{gameData.letter}}</b></h1>
    </main>
  </main>
</template>

<script>
import * as gameService from "../services/game"

export default {
  name: "LetterShow",
  data() {
    return {
      gameData: JSON.parse(sessionStorage.getItem('data'))
    }
  }
}
</script>

<style scoped>

h1 {
  margin-top: 15%;
  margin-bottom: 15%;
  text-align: center;
}

html {
  height: 100%;
}

#letter h1 {
  text-shadow: 0 0 60px rgb(216, 149, 86);
  text-align: center;
  position: center;
  padding-top: 30%;

}

#letter {
  font-family: "HelveticaRounded", Arial, sans-serif;
  color: rgb(255, 255, 255);
  width: 100%;
  height: 100%;
  text-align: center;
  transform: scale(2.27);
  position: center;
  left: 0;
  right: 0;
}
</style>