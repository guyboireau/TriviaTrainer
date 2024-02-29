<template>
  <div  class="register-container">
    <h1>Registration</h1>
    <form @submit.prevent="registerUser" >
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
import { defineComponent } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { setDoc, doc, collection } from 'firebase/firestore'
import { db } from '@/firebase/firebase'

const auth = getAuth()

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
        this.$router.push('/login')
        console.log('User registered successfully')
        await this.addUser(newUser.user?.uid)
      } catch (error) {
        console.error(error)
      }
    },
    addUser: async function (newUserId: string) {
      if (!newUserId) {
        console.error('User ID is not provided')
        return
      }

      try {
        const userRef = collection(db, 'usertrivial')
        await setDoc(doc(userRef, newUserId), {
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

.register-container {
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
input[type="password"],
input[type="text"] {
  padding: 5px;
  border: 1px solid hsl(0, 0%, 80%);
  border-radius: 4px;

}

</style>
