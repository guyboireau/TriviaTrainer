<script lang='ts'>
import { Options, Vue } from 'vue-class-component'
import QuestionComponent from '@/components/QuestionComponent.vue'
import { Question } from '@/types/Question'
import { reactive } from 'vue'

const fetchQuestion = async () => {
  try {
    const response = await fetch('https://the-trivia-api.com/v2/questions')
    if (!response.ok) {
      throw new Error('Unable to fetch questions')
    }
    const data = await response.json()
    // Vérifie si les données sont conformes à la structure de Question
    if (Array.isArray(data) && data.every(item => 'id' in item && 'question' in item && 'category' in item && 'type' in item && 'difficulty' in item && 'correctAnswer' in item && 'incorrectAnswers' in item)) {
      state.questions.push(...(data as Question[]))
    } else {
      throw new Error('Invalid data received')
    }
  } catch (error) {
    console.error('Error fetching questions:', error)
    // Gérer l'erreur de manière appropriée (affichage d'un message d'erreur, etc.)
  }
}

const state = reactive({
  questions: [],
  correctAnswersCount: 0,
  incorrectAnswersCount: 0
})

fetchQuestion()

@Options({
  components: {
    QuestionComponent
  }
})

export default class HomeView extends Vue {
  state = state

  // Méthode pour incrémenter le compteur de bonnes réponses
  incrementCorrectAnswers () {
    this.state.correctAnswersCount++
  }

  incrementIncorrectAnswers () {
    this.state.incorrectAnswersCount++
  }
}
</script>

<template>
  <div class='home'>
    <p>Nombre de bonnes réponses : {{ state.correctAnswersCount }}</p>
    <p>Nombre de mauvaise réponses : {{ state.incorrectAnswersCount }}</p>
    <div v-if='state.questions.length > 0'>
      <QuestionComponent
        v-for='question in state.questions'
        :key='question.id'
        :question='question'
        :incrementCorrectAnswers='incrementCorrectAnswers'
        :incrementIncorrectAnswers='incrementIncorrectAnswers'
      />
    </div>
  </div>
</template>
