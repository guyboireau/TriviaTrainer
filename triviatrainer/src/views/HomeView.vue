<template>
  <div class='home'>
    <!-- <img alt='Vue logo' src='../assets/logo.png'> -->
    <QuestionComponent v-for='question in state.questions' :key='question' :question='question' />
  </div>
</template>

<script lang='ts'>
import { Options, Vue } from 'vue-class-component'
import QuestionComponent from '@/components/QuestionComponent.vue'
import { ref } from 'vue'

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
// const token = initToken()
// const fetchToken = async () => {
//   const response = await fetch('https://opentdb.com/api_token.php?command=request')
//   return (await response.json()).token
// }
const fetchQuestion = async () => {
  fetch('https://opentdb.com/api.php?amount=10&type=multiple')
    .then((res) => res.json())
    .then((data) => {
      state.value.questions = data.results
    })
}

fetchQuestion()

const state = ref({
  questions: [
    {
      category: ref(''),
      type: ref(''),
      difficulty: ref(''),
      question: ref(''),
      correct_answer: ref(''),
      incorrect_answers: ref([])
    }
  ]
})

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
