<template>
<main>
    <nav draggable="false">
        <ul>
            <li><router-link class='btn' v-bind:class="[globalContrastVariable.applyContrast ? 'joinContrast': 'join']" to='/Join'>entrar</router-link> </li>
            <li><router-link class='btn' v-bind:class="[globalContrastVariable.applyContrast ? 'createContrast' : 'create']" to='/Create' >criar jogo</router-link> </li>
            <li class="btn createContrast" @click="modifyClass()">alto contraste</li>
        </ul>
    </nav>

    </main>
</template>

<script>

import { globalContrastVariable } from '../main.js';

export default {
    name: 'main-menu',

    methods:
    {
        onJoin(){

        },
        onCreate(){

        },
        modifyClass(event){
            this.globalContrastVariable.applyContrast = !this.globalContrastVariable.applyContrast;
        },
        debug() {
            globalContrastVariable.modify();
        }
    },

    data() {
        return {
            globalContrastVariable
        }
    }
}
</script>

<style scoped>
nav .create:hover { border-bottom: 3px solid rgb(91, 121, 68); }

nav .join:hover{ border-bottom: 3px solid rgb(101, 143, 177); }

nav .join{ border-bottom: 3px solid rgb(60, 92, 117); }

nav
{
    margin-top: 8vh;
    user-select: none;
}

nav ul
{
    list-style-type: none;
    padding: 0;
}

nav .btn
{
    display: block;
    margin: auto;
    text-transform: uppercase;
    border-radius: 30px;
    width:30vh;
    transform: scale(1);
    transition: 0.5s;
    padding-bottom: 6px;
}

nav .btn:hover
{
    transform: scale(1.09);
    transition: 0.5s;
}

nav .join
{
    color: rgb(34, 50, 63);
    background-image: linear-gradient(to bottom, #6da7d8, #6cafda, #6db7db, #71bfdc, #78c6dc);
    border: 1px solid rgb(121, 170, 211);
    border-bottom: 3px solid rgb(121, 170, 211);
}

nav .joinContrast
{
    color: rgb(255, 255, 255);
    background-image: linear-gradient(to bottom, #1d1d1d, #1c2912, #1e1f1e, #1d1d1d, #181818);
    border: 1px solid rgb(20, 22, 24);
    border-bottom: 3px solid #3d3d3d;
}

nav .create
{
    color: rgb(54, 71, 42);
    background-image: linear-gradient(to bottom, #98ca70, #a0d376, #a7dc7d, #afe583, #b7ee8a);
    border: 1px solid #98CA70;
    border-bottom: 3px solid #98CA70;
    margin-top: 2vh;
}

nav .createContrast
{
    color: rgb(255, 255, 255);
    background-image: linear-gradient(to bottom, #1d1d1d, #1c2912, #1e1f1e, #1d1d1d, #181818);
    border: 1px solid #111111;
    border-bottom: 3px solid #0f0f0f;
    margin-top: 2vh;
}

nav a
{
    font-size: 3vh;
    text-decoration: none;
}
</style>
