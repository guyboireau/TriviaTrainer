<template>
  <div class="question-card">
    <div v-if="question" class="card">
      <h2>{{  decodeHtml((question.category).charAt(0).toUpperCase() + (question.category).slice(1)) }}</h2>
      <h3>{{ decodeHtml(question.question) }}</h3>
      <p>{{ question.difficulty }}</p>
      <div class="answers">
        <button v-for="answer in shuffledAnswers" :key="answer" :class="getButtonClass(answer)" :disabled="answerSelected"
          @click="checkAnswer(answer)">
          {{ decodeHtml(answer) }}
        </button>
      </div>
    </div>
    <div v-else>
      <p>Aucune question à afficher</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue'

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

function decodeHtml (html) {
  const txt = document.createElement('textarea')
  txt.innerHTML = html
  return txt.value
}

const props = defineProps({
  question: Object,
  incrementCorrectAnswers: Function,
  incrementIncorrectAnswers: Function
})

const shuffledAnswers = ref<string[]>([])
const answerSelected = ref(false)
const selectedAnswer = ref('')

onMounted(() => {
  if (props.question) {
    const answers = [...props.question.incorrect_answers, props.question.correct_answer]
    shuffledAnswers.value = shuffle(answers)
  }
})

const checkAnswer = (answer: string) => {
  if (!answerSelected.value) {
    answerSelected.value = true
    selectedAnswer.value = answer
    if (props.question && answer === props.question.correct_answer) {
      if (props.incrementCorrectAnswers) {
        props.incrementCorrectAnswers()
      } else {
        props.incrementIncorrectAnswers()
      }
    } else {
      props.incrementIncorrectAnswers()
    }
  }
}
const getButtonClass = (answer: string) => {
  if (answer === props.question?.correct_answer && selectedAnswer.value !== '') {
    return 'correct-answer'
  } else if (answer === selectedAnswer.value) {
    return 'selected-answer'
  }
}
</script>

<style scoped>
.question-card {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card {
  background-color: #f0f0f0;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 600px;
}

.answers {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

button {
  margin: 5px;
  border-radius: 10%;
  font-size: large;
}

.correct-answer {
  background-color: green;
}

.selected-answer {
  background-color: red;
}
</style>
