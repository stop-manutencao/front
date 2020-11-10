<template>
    <div id="bg">
        <div id="app" v-bind:class="[globalContrastVariable.applyContrast ? 'appContrast':'app']">
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
import { globalContrastVariable } from './main'
export default {
    name: 'App',

    data() {
        return {
            globalContrastVariable
        }
    }
}
</script>

<style>

    .fade-enter-active, .fade-leave-active
    {
        transition-duration: 0.1s;
        transition-property: opacity;
        transition-timing-function: ease;
    }

    .fade-enter, .fade-leave-active { opacity: 0 }

    .app{
        position: absolute;
        height: 100%;
        left: 0;
        width: 100%;
        margin: auto;
        top: 0;
        background: url('./assets/png/background.png') no-repeat;
        background-position-x: center;
        background-size: cover;
       /* background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23333333' fill-opacity='0.08'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");*/
    }

    .appContrast{
        position: absolute;
        height: 100%;
        left: 0;
        width: 100%;
        margin: auto;
        top: 0;
        background: url('./assets/png/background_contrast.png') no-repeat;
        background-position-x: center;
        background-size: cover;
       /* background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23333333' fill-opacity='0.08'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");*/
    }

    #bg
    {
        background-size: 6vh;
        animation:move 50s linear infinite;
        background-image: url('./assets/svg/hideout.svg');
        height: 100%;
        width: 100%;
        position: fixed;
        left: 0;
        top: 0;
    }

    @keyframes move
    {
        from { background-position: 0px 0; }
        to { background-position: 562px; }
    }

    @font-face
    {
        font-family: 'Din';
        src: url('./assets/fonts/DIN Next W01 Light.ttf');
    }

    @font-face
    {
        font-family: 'HelveticaRounded';
        src: url('./assets/fonts/helvetica-rounded-bold.otf');
    }

    @font-face
    {
        font-family: 'Avenir';
        src: url('./assets/fonts/AvenirNextLTPro-DemiCn.otf');
    }

     @font-face
    {
        font-family: 'Exo2';
        src: url('./assets/fonts/Exo2-Light.ttf');
    }

     @font-face
    {
        font-family: 'Exo2-reg';
        src: url('./assets/fonts/Exo2-Regular.ttf');
    }

    @font-face
    {
        font-family: mandatory;
        src: url('./assets/fonts/MANDATOR.ttf');
    }
</style>
