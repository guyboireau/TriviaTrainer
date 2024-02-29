<template>
    <div class="categ-card">
        <router-link :to="{ name: 'quizz', params: { id: category.id } }">
        {{ decodeHtml(category.name) }}
      </router-link>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue'

function decodeHtml (html) {
  const txt = document.createElement('textarea')
  txt.innerHTML = html
  return txt.value
}

const props = defineProps({
  category: Object
})
</script>
  <style scoped>
  .categ-card {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .card {
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
  }

  .correct-answer {
    background-color: green;
  }

  .selected-answer {
    background-color: red;
  }
  </style>
