<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/randomquizz">Quizz</router-link> |
      <router-link v-if="!loggedIn" to="/login">Login | </router-link>
      <router-link v-if="loggedIn" to="/profile">Profile | </router-link>
      <router-link to="/" v-if="loggedIn" @click.prevent="logout">Logout | </router-link>
      <router-link v-if="!loggedIn" to="/register">Register</router-link>
      <router-link to="/score">Score</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script lang="ts">
import { onAuthStateChanged } from '@/firebase/firebase.js'
import { getAuth, signOut } from 'firebase/auth'

export default {
  data () {
    return {
      loggedIn: false
    }
  },
  created () {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      this.loggedIn = !!user
    })
  },
  methods: {
    async logout () {
      const auth = getAuth()
      try {
        await signOut(auth)
        console.log('Déconnexion réussie')
      } catch (error) {
        console.error('Erreur lors de la déconnexion : ', error)
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
