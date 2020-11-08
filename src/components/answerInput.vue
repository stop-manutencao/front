<template>
<main>
    <button :class="isSelected" @click="answerQuestion()">{{alternative}}</button>
</main>
</template>

<script>
import { answer } from '../services/game';
import { globalContrastVariable } from "../main.js";

export default {
    props:{
        alternative: {
            required:true,
            type: String
        },
        alternativeID: {
            required:true,
            type: String
        },
        selected:{
            required: true,
            type: Boolean
        },
        categoryIndex:{
            required: true,
            type: Number
        }
    },


    data(){
        return{
            innerSelected: false,
            gameData: JSON.parse(sessionStorage.getItem('data'))
        }
    },

    computed:{
        isSelected(){
            var style = ""
            // console.log(this.categoryIndex)

            // console.log('global: ', globalContrastVariable);
            switch (this.categoryIndex % 3){
                case 0:
                    style = "orange"
                    if (globalContrastVariable.applyContrast) {
                        style = "contrast"
                    }
                    break;
                case 1:
                    style = "green"
                    if (globalContrastVariable.applyContrast) {
                        style = "contrast"
                    }
                    break;
                case 2:
                    style = "blue"
                    if (globalContrastVariable.applyContrast) {
                        style = "contrast"
                    }
                    break;
            }
            
            if (this.selected){
                return style + "_selected"
            }
            return style
        },
    },

    methods:{
        answerQuestion(){
            console.log("player " + this.gameData.playerID + " choses answer " + this.alternativeID)
            const data = {
                userId: this.gameData.playerID,
                alternativeId: this.alternativeID
            }
            answer(data)
            .then(res => {
                if (res.status === 200) {
                    console.log("success")
                    this.$emit("alternativeChosen");
          }
        })
        .catch(err => {
          console.error(err)
        })
        }
    }
    
}
</script>

<style scoped>

.orange{
    background: none;
    border:1px solid #ff9200;
    box-shadow: inset 0 0 20px #ff910054;
}
.orange:hover, .orange:focus{
    background: #ff9200 !important;
    border:1px solid #ffae45;
    border-bottom: 5px solid #ffae45;
    text-shadow: 0 0 3vh #ffe4a6 !important;
}

.orange_selected{
    background: #ff9200 !important;
    border:1px solid #ffae45;
    border-bottom: 5px solid #ffae45;
    text-shadow: 0 0 3vh #ffe4a6 !important;
}

.green{
   background: none;
   border:1px solid #9ac974;
   box-shadow: inset 0 0 20px #9ac9744a;
}
.green:hover, .green:focus{
    background: #9ac974 !important;
    border: 1px solid #c5ff96;
    border-bottom: 5px solid #c5ff96;
    text-shadow: 0 0 2vh #c9ffa8 !important;
}

.green_selected{
    background: #9ac974 !important;
    border: 1px solid #c5ff96;
    border-bottom: 5px solid #c5ff96;
    text-shadow: 0 0 2vh #c9ffa8 !important;
}

.grActive{
    background: #9ac974 !important;
    border: 1px solid #c5ff96;
    border-bottom: 5px solid #c5ff96;
    text-shadow: 0 0 2vh #c9ffa8 !important;
}

.blue{
   background: none;
   border:1px solid #6dc8ff;
   box-shadow: inset 0 0 20px #6dc8ff4a;
}
.blue:hover, .blue:focus{
    background: #6dc8ff !important;
    border: 1px solid #b7e9ff;
    border-bottom: 5px solid #b7e9ff;
    text-shadow: 0 0 2vh #a8f3ff;
}
.blue_selected{
    background: #6dc8ff !important;
    border: 1px solid #b7e9ff;
    border-bottom: 5px solid #b7e9ff;
    text-shadow: 0 0 2vh #a8f3ff;
}

.contrast{
   background: none;
   border:1px solid #ffffff;
   box-shadow: inset 0 0 20px #c5c5c54a;
}

.contrast_selected{
    background: #1a1a1a !important;
    border: 1px solid #ffffff;
    border-bottom: 5px solid #bbbbbb;
    text-shadow: 0 0 2vh #252525;
    color: #ffffff;
}

.contrast:hover, .contrast:focus{
    background: #161616 !important;
    border: 1px solid #ffffff;
    border-bottom: 5px solid #bbbbbb;
    text-shadow: 0 0 2vh #ffffff;
    color: #ffffff;
}


button{
    transition: 0.3s;
    text-transform: uppercase;
    letter-spacing: 3px;
    font-size: 1.9vh;
    font-family: Exo2-reg;
    width: 40vh;
    height: 8vh;
    color: white;
    border-radius: 5vh;
}

button:hover{
    transition: 0.3s;
    width: 45vh;
    color: #333333;
}

</style>
