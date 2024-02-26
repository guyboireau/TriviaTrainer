<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/login" v-if="!loggedIn">Login</router-link> |
      <router-link to="/profile" v-if="loggedIn">Profile</router-link> |
      <router-link to="/logout" v-if="loggedIn">Logout</router-link> |
      <router-link to="/register" v-if="!loggedIn">Register</router-link>
      <router-link to="/score">Score</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script lang="ts">
import { auth, onAuthStateChanged, user } from '@/firebase/firebase.js'

export default {
  data () {
    return {
      loggedIn: false
    }
  },
  created () {
    // onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     this.loggedIn = true
    //   } else {
    //     this.loggedIn = false
    //   }
    // })
    if (user) {
      this.loggedIn = true
      console.log('User is logged in')
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
