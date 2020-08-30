
<template>
    <!-- <div id="bg"> -->
      <div id="home">
          <img id="logo" draggable="false" src="../assets/png/logo_1.png">
          <main-menu/>
          <h1>mobis</h1>
      </div>
   <!-- </div> -->
</template>

<script>
  import mainMenu from '../components/mainMenu';

  export default {
    name: 'Home',

    components: {
              'main-menu': mainMenu
    },
  }

</script>

<style scoped>
/*
@keyframes move{
 from { background-position: 0px 0; }
  to { background-position: 562px; }
}

  #bg
  {
    background: url('/static/img/bg.png') no-repeat;
    background-position: center;
    background-size: cover;
    height: 100%;
  }
*/
  h1{
    font-size: 2.2vh;
    bottom:15px;
    left:0;
    right:0;
    position: absolute;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: 'HelveticaRounded';
    color: #cccccca2;
    user-select: none;
  }

  #home
  {
    font-family: 'HelveticaRounded', 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    position:relative;
    /*background-size: 9vh;
    animation:move 50s linear infinite;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23333333' fill-opacity='0.08'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"); */ 
    height: 100%;
   }

   #home #logo{
     margin-top: 10vh;
     margin-bottom: 5vh;
     width: 35vh;
   }
</style>
