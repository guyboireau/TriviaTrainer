<template>
  <div>
    <h1>Registration</h1>
    <form @submit.prevent="registerUser">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required>
      <br>
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="name" required>
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
import { setDoc, doc, collection, addDoc } from 'firebase/firestore'
import { db } from '@/firebase/firebase'

const auth = getAuth()
const user = auth.currentUser

export default defineComponent({
  data () {
    return {
      email: '',
      name: '',
      password: ''
    }
  },
  methods: {
    async registerUser () {
      try {
        const newUser = await createUserWithEmailAndPassword(auth, this.email, this.password)
        console.log('User registered successfully')
        await this.addUser(newUser.user?.uid)
      } catch (error) {
        console.error(error)
        // if (error instanceof AuthError || error.code === 'auth/invalid-email' || error.code === 'auth/email-already-in-use') {
        //   console.error('Auth error:', error.message)
        // } else {
        //   console.error('Unknown error:', error.message)
        // }
      }
    },
    addUser: async function (newUserId: string) {
      if (!newUserId) {
        console.error('User ID is not provided')
        return
      }

      try {
        const userRef = collection(db, 'user')
        await addDoc(userRef, {
          name: this.name,
          userId: newUserId
        })
        console.log('User added successfully')
      } catch (error) {
        console.error('Error adding user: ', error)
      }
    }
  }
})
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.container {
  width: 300px;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
}

form {
  display: flex;
  flex-direction: column;
}

input {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

button {
  padding: 10px;
  background-color: #007BFF;
  /* color: #fff; */
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
