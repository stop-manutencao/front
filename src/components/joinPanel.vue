<template>
    <main>
        <form>
            <input name="Id" type="number" placeholder="ID da partida" required/><br>

            <input name="apelido" type="text" placeholder="Apelido" required/><br>

            <input name="email" type="email" placeholder="email@example.com" required/>
        </form>
                      
        <a >Entrar</a> <!-- v-on:click="onJoinGamePage" -->
        <a >Voltar</a> <!-- v-on:click="onReturnHomePage" -->
    </main>
</template>

<script>
export default {
    name:'join-panel',
}
</script>

<style scoped>
form{ padding-top: 2vh; }

main
{
      font-size: 20px;
      color: rgb(34, 50, 63);
      background-image: linear-gradient(to right top, #6da7d8, #6cafda, #6db7db, #71bfdc, #78c6dc);
      border-top: 3px solid rgb(153, 209, 255);
      border-radius: 7px;
      width:25vh;
      margin: auto;
      margin-top: 8%;
      transition: 1s;
      transform: scale(1.3);
}

input
{
        margin-bottom:2vh;
        width: 20vh;
        height: 3vh;
        border-radius: 5px;
        border: 1px solid grey;
        font-size:2vh;
}
</style>