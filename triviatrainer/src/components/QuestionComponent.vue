<template>
  <div>
    <h2>{{ question.category }}</h2>
    <h2>{{ question.question }}</h2>
    <h2>{{ question.type }} - {{ question.difficulty }}</h2>
    <!-- {{ question.incorrect_answers.push(q uestion.correct_answer) }} -->
    <!-- <p>{{ question.correct_answer }}</p> -->
    <button v-for='answer in shuffledAnswers' :key='answer'>{{ answer }}</button>
  </div>
</template>

<script lang='ts'>
import { ref, defineProps } from 'vue'
import { Options, Vue } from 'vue-class-component'

const shuffle = (array: string[]) => {
  let currentIndex = array.length
  let temporaryValue
  let randomIndex
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }
  return array
}

const props = defineProps({
  question: String,
  type: String,
  difficulty: String,
  correctAnswer: String,
  incorrectAnswers: Array
})

const correctAnswer = ref(props.correctAnswer)
const incorrectAnswers = ref(props.incorrectAnswers)

const answers = [correctAnswer.value, ...(incorrectAnswers.value as string[])]
const shuffledAnswers = shuffle(answers.filter(answer => answer !== undefined) as string[])

@Options({
  props: {
    question: String,
    category: String,
    type: String,
    difficulty: String,
    correctAnswer: String,
    incorrectAnswers: Array
  }
})

export default class QuestionComponent extends Vue {
  question!: string
  category!: string
  type!: string
  difficulty !: string
  correctAnswer !: string
  incorrectAnswers !: [string]
}
</script>
