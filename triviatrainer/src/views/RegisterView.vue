<template>
  <div>
    <h1>Registration</h1>
    <form @submit.prevent="registerUser">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required>
      <br>
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required>
      <br>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script lang="ts">
// import { createUserWithEmailAndPassword, AuthError } from '@/firebase/firebase.js'
import { defineComponent, ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

const auth = getAuth()

export default defineComponent({
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async registerUser () {
      try {
        await createUserWithEmailAndPassword(auth, this.email, this.password)
        console.log('User registered successfully')
      } catch (error) {
        console.error(error)
        // if (error instanceof AuthError || error.code === 'auth/invalid-email' || error.code === 'auth/email-already-in-use') {
        //   console.error('Auth error:', error.message)
        // } else {
        //   console.error('Unknown error:', error.message)
        // }
      }
    }
  }
})
</script>

<style scoped>
/* Add your custom styles here */
</style>
