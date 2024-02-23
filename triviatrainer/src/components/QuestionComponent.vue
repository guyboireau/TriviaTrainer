<template>
  <div class="question-card">
    <div v-if="question" class="card">
      <h2>{{ (question.category).charAt(0).toUpperCase() + (question.category).slice(1) }}</h2>
      <h3>{{ question.question.text }}</h3>
      <p>{{ question.difficulty }}</p>
      <div class="answers">
        <button v-for="answer in shuffledAnswers" :key="answer" @click="checkAnswer(answer)">{{ answer }}</button>
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

const props = defineProps({
  question: Object
})

const shuffledAnswers = ref<string[]>([])
const correctAnswers = ref(0)
const incorrectAnswers = ref(0)

onMounted(() => {
  if (props.question) {
    const answers = [...props.question.incorrectAnswers, props.question.correctAnswer]
    shuffledAnswers.value = shuffle(answers)
  }
})

const checkAnswer = (selectedAnswer: string) => {
  if (props.question && selectedAnswer === props.question.correctAnswer) {
    correctAnswers.value++
  } else {
    incorrectAnswers.value++
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
}
</style>
