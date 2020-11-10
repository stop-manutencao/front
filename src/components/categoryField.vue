<template>
<main>
    <div id="alternatives-container">
        <ul>
            <li :key="index" v-for="(alternative, index) in alternatives">
                <answer-input @alternativeChosen="setAlternative(index)" 
                :alternative="alternative.description" 
                :alternativeID="alternative._id" 
                :selected="alternativeIsSelected[index]"
                :categoryIndex="categoryIndex"/>
            </li>
        </ul>
    </div>
</main>
</template>

<script>
import answerInput from './answerInput'
export default {

    props:{
        category:{
            required: true,
            type: Object
        },
        categoryIndex:{
            required: true,
            type: Number
        }
    },

    components:{
        "answer-input": answerInput
    },

    data(){
        return{
            /**This arrray below sends the component information of it's selectio. Only one should be selected always.
               It's initial start is the four alternatives marking false, meaning none was selected yet
             */
            alternativeIsSelected:[false, false, false, false],
            alternatives: Object,
            answered: false
        }
    },

    mounted(){
        this.alternatives = this.category.alternative

    },

    methods:{
        setAlternative(alternativeIndex){
            this.alternativeIsSelected = [false,false,false,false]
            this.alternativeIsSelected[alternativeIndex] = true
            if(!this.answered){
                this.answered = true
                this.$emit("categoryAnswered")
            }
            
        },
        
    }
    
}
</script>

<style scoped>

#alternatives-container{
  text-align: center;
  border-top: 1px solid #0e0e0e;
  border-bottom: 1px solid #3e3e3e;
}


ul{
    list-style: none;
    padding: 0;
    height: 45vh;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
}
</style>
