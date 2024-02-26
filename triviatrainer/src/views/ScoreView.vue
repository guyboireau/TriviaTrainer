<template>
  <div>
    <h2>Classement des joueurs</h2>
    <ul>
      <li v-for='(player, index) in players' :key='index'>
        {{ player.name }} - Score: {{ player.score }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { collection, getDocs } from 'firebase/firestore'
import { db, playersCollection } from '@/firebase/firebase.js'
import { Vue } from 'vue-class-component'

export default class ScoreView extends Vue {
  players: { name: string; score: number }[] = []

  async created () {
    await this.fetchPlayers()
  }

  async fetchPlayers () {
    const querySnapshot = await getDocs(playersCollection)
    querySnapshot.forEach((doc) => {
      this.players.push(doc.data() as { name: string; score: number })
    })
  }
}
</script>

<style>
/* Styles here */
</style>
