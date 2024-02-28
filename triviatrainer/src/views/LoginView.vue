<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required>
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script lang="ts">
// import { signInWithEmailAndPassword } from '../firebase/firebase.js'
import { defineComponent } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const auth = getAuth()

export default defineComponent({
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login () {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password)
        localStorage.setItem('@user', JSON.stringify(userCredential.user))
        console.log('User logged in successfully')
      } catch (error) {
        console.log('Error logging in:', error)
      }
    }
  }
})
</script>

<style>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

label {
  font-weight: bold;
}

input[type="email"],
input[type="password"] {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px;
  /* background-color: #007bff; */
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
