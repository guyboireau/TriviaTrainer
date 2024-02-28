<template>
  <div class='dark-mode'>
    <h1>Quizz</h1>
    <p>Testez vos connaissances</p>
    <p>Nombre de bonnes réponses : {{ state.correctAnswersCount }}</p>
    <p>Nombre de mauvaise réponses : {{ state.incorrectAnswersCount }}</p>
    <button @click='fetchQuestions'>Question suivante</button>
    <div v-if='state.questions.length > 0'>
      <QuestionComponent v-for='(question, index) in state.questions' :key='index' :question='question'
                          :incrementCorrectAnswers='incrementCorrectAnswers'
                          :incrementIncorrectAnswers='incrementIncorrectAnswers' />
    </div>
    <div v-else>
      <p>Aucune question à afficher</p>
    </div>
    <div class='categories'>
      <div v-for="category in state.categories" :key="category.id" class="card">
        <CategoryComponent :category="category" />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Options } from 'vue-class-component'
import QuestionComponent from '@/components/QuestionComponent.vue'
import { Question } from '@/types/Question'
import { reactive } from 'vue'
import { collection, getDocs, query, setDoc, where, doc } from 'firebase/firestore'
import { db } from '@/firebase/firebase'
import CategoryComponent from '@/components/CategoryComponent.vue'

@Options(
  {
    components: {
      QuestionComponent,
      CategoryComponent
    }
  }
)
export default class HomeView extends Vue {
  state = reactive({
    questions: [],
    categories: [],
    correctAnswersCount: 0,
    incorrectAnswersCount: 0,
    score: 0
  })

  async mounted () {
    this.state.questions = []
    if (!localStorage.getItem('@token')) {
      await this.fetchToken()
    }
    this.fetchQuestions()
    this.fetchCategories()
  }

  async fetchToken () {
    try {
      const response = await fetch('https://opentdb.com/api_token.php?command=request')
      const data = await response.json()
      if ('token' in data) {
        localStorage.setItem('@token', data.token)
      } else {
        throw new Error('Invalid token received')
      }
    } catch (error) {
      console.error('Error fetching token:', error)
    }
  }

  async fetchCategories () {
    try {
      const response = await fetch('https://opentdb.com/api_category.php')
      const data = await response.json()
      this.state.categories = data.trivia_categories
      this.state.categories = this.state.categories.slice(0, 5)
    } catch (error) {
      console.error(error)
    }
  }

  async fetchQuestions () {
    try {
      this.state.questions = []
      const response = await fetch('https://opentdb.com/api.php?amount=1' + '&token=' + localStorage.getItem('@token'))
      const data = await response.json()
      if (Array.isArray(data.results) && data.results.every(item => 'question' in item && 'category' in item && 'type' in item && 'difficulty' in item && 'correct_answer' in item && 'incorrect_answers' in item)) {
        this.state.questions.push(...(data.results as Question[]))
      } else {
        throw new Error('Invalid data received')
      }
    } catch (error) {
      console.error('Error fetching questions:', error)
    }
  }

  incrementCorrectAnswers () {
    this.state.correctAnswersCount++
    this.state.score += 10
    if (this.totalQuestions === 10) {
      if (this.state.correctAnswersCount === 10) {
        this.addScore()
      }
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
}
</script>
<style scoped lang="css">
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

body {
  font-family: Arial, sans-serif;
  /* background-color: #222; */
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

/* .dark-mode {
  background-color: #222;
  color: #fff;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
} */

h1 {
  font-size: 2em;
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
}

.card {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
}
</style>
