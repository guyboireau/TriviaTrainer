<script lang='ts'>
import { Options, Vue } from 'vue-class-component'
import QuestionComponent from '@/components/QuestionComponent.vue'
import { Question } from '@/types/Question'
import { reactive } from 'vue'
import { collection, getDocs, query, setDoc, where, doc } from 'firebase/firestore'
import { db } from '@/firebase/firebase'

const fetchToken = async () => {
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
    const data = await response
    if ('token' in data) {
      localStorage.setItem('@token', data.token)
    } else {
      throw new Error('Invalid token received')
    }
  } catch (error) {
    console.error('Error fetching token:', error)
  }
}

const fetchQuestion = async () => {
  try {
    const response = await fetch('https://opentdb.com/api.php?amount=10' + '&token=' + localStorage.getItem('@token'))
      .then((response) => response.json())
    const data = await response.results
    if (Array.isArray(data) && data.every(item => 'question' in item && 'category' in item && 'type' in item && 'difficulty' in item && 'correct_answer' in item && 'incorrect_answers' in item)) {
      state.questions.push(...(data as Question[]))
    } else {
      throw new Error('Invalid data received')
    }
  } catch (error) {
    console.error('Error fetching questions:', error)
  }
}

const fetchQuestionByCategory = async (categoryId: string) => {
  try {
    const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${categoryId}` + '&token=' + localStorage.getItem('@token'))
      .then((response) => response.json())
    const data = await response.results
    if (Array.isArray(data) && data.every(item => 'question' in item && 'category' in item && 'type' in item && 'difficulty' in item && 'correct_answer' in item && 'incorrect_answers' in item)) {
      state.questions.push(...(data as Question[]))
    } else {
      throw new Error('Invalid data received')
    }
  } catch (error) {
    console.error('Error fetching questions:', error)
  }
}

const state = reactive({
  questions: [],
  correctAnswersCount: 0,
  incorrectAnswersCount: 0,
  score: 0
})

@Options({
  components: {
    QuestionComponent
  }
})

export default class QuizzView extends Vue {
    state = state
    async mounted () {
      this.state.questions = []
      fetchToken()
      if (this.$route.params && this.$route.params.id) {
        const categoryId = this.$route.params.id
        fetchQuestionByCategory(categoryId as string)
      } else {
        fetchQuestion()
      }
    }

    incrementCorrectAnswers () {
      this.state.correctAnswersCount++
      this.state.score += 10
      if (this.totalQuestions === 10) {
        if (this.state.correctAnswersCount === 10) {
          this.state.score += 100
        }
        this.addScore()
      }
    }

    incrementIncorrectAnswers () {
      this.state.incorrectAnswersCount++
      this.state.score -= 5
      if (this.totalQuestions === 10) {
        this.addScore()
      }
    }

    get totalQuestions (): number {
      return this.state.correctAnswersCount + this.state.incorrectAnswersCount
    }

    async addScore () {
      const user = JSON.parse(localStorage.getItem('@user') || '{}')
      if (!user?.uid) {
        console.error('User not authenticated')
        return
      }

      const userRef = collection(db, 'usertrivial')
      const userQuery = query(userRef, where('userId', '==', user.uid))
      const querySnapshot = await getDocs(userQuery)

      if (querySnapshot.empty) {
        console.log('User not found')
      } else {
        const userData = querySnapshot.docs[0].data()
        const currentScore = userData.score || 0
        console.log('Updating existing user entry...')
        await setDoc(doc(userRef, user.uid), {
          name: userData.name || 'Unknown',
          userId: user.uid,
          score: this.state.score + currentScore
        })
      }
    }

    async resetAnswewrs () {
      this.state.correctAnswersCount = 0
      this.state.incorrectAnswersCount = 0
      this.state.score = 0
      fetchQuestion()
    }
}
</script>

<template>
    <div class='home'>
        <h1>Quizz</h1>
        <p>Testez vos connaissances</p>
        <p>Nombre de bonnes réponses : {{ state.correctAnswersCount }}</p>
        <p>Nombre de mauvaise réponses : {{ state.incorrectAnswersCount }}</p>
        <p>Score : {{ state.score }}</p>
        <button @click='resetAnswewrs'>Nouvel session</button>
        <div v-if='state.questions.length > 0'>
            <QuestionComponent v-for='(question, index) in state.questions' :key='index' :question='question'
                :incrementCorrectAnswers='incrementCorrectAnswers' :incrementIncorrectAnswers='incrementIncorrectAnswers' />
        </div>
    </div>
</template>
