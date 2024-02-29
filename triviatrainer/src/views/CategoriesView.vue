<template>
  <div>
    <h1>Categories</h1>
    <div class="card-container">
      <div v-for="category in categories" :key="category.id" class="card">
        <CategoryComponent :category="category" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CategoryComponent from '@/components/CategoryComponent.vue'

export default {
  data () {
    return {
      categories: []
    }
  },
  mounted () {
    this.fetchCategories()
  },
  methods: {
    async fetchCategories () {
      try {
        const response = await fetch('https://opentdb.com/api_category.php')
        const data = await response.json()
        this.categories = data.trivia_categories
      } catch (error) {
        console.error(error)
      }
    }
  },
  components: { CategoryComponent }
}
</script>

<style>
.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.card {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 16px;
  margin: 8px;
}
</style>
