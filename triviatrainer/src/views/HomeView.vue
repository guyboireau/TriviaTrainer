<script lang='ts'>
import { Options, Vue } from 'vue-class-component'
import QuestionComponent from '@/components/QuestionComponent.vue'
import { reactive, ref } from 'vue'

// const initToken = async () => {
//   const token = localStorage.getItem('token') || ''
//   if (token) {
//     return token
//   } else {
//     const newToken = await fetchToken()
//     localStorage.setItem('token', newToken)
//     return newToken
//   }
// }
// const fetchToken = async () => {
//   const response = await fetch('https://opentdb.com/api_token.php?command=request')
//   return (await response.json()).token
// }

// const token = initToken()

const fetchQuestion = async () => {
  fetch('https://the-trivia-api.com/v2/questions')
    .then((res) => res.json())
    .then((data) => {
      state.questions.push(...data)
      // console.log(state.questions)
    })
}

fetchQuestion()

const state = reactive({
  questions: [
    {
      id: String,
      question: {
        text: String
      },
      category: String,
      type: String,
      difficulty: String,
      correctAnswer: String,
      incorrectAnswers: [String]
    }
  ]
})
state.questions.splice(0, 1)

@Options({
  components: {
    QuestionComponent
  }
})

export default class HomeView extends Vue {
  state = state
  data (): object {
    return {
      state: state
    }
  }
}
</script>

<template>
  <div class='home'>
    <!-- <img alt='Vue logo' src='../assets/logo.png'> -->
    <div v-if='state.questions!==null'>
      <QuestionComponent v-for='question in state.questions' :key='question.id' :question='question' />
    </div>
  </div>
</template>
