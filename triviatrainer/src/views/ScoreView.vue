<template>
  <div class="score-view">
    <h2>Classement des joueurs</h2>
    <ul>
      <li v-for="(player, index) in players" :key="index" class="player-item">
        {{ player.name }} - Score: {{ player.score }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {
  collection, query, orderBy, getDocs
} from 'firebase/firestore'
import { db } from '@/firebase/firebase'
import { Vue } from 'vue-class-component'

export default class ScoreView extends Vue {
  players: { name: string; score: number }[] = []

  async created () {
    await this.fetchPlayers()
  }

  async fetchPlayers () {
    const playersCollection = collection(db, 'usertrivial')
    const querySnapshot = await getDocs(query(playersCollection, orderBy('score', 'desc')))
    querySnapshot.forEach((doc) => {
      this.players.push(doc.data() as { name: string; score: number })
    })
  }
}
</script>

<style scoped>

li {
  list-style: none;
}
.score-view {
  max-width: 600px;
  margin: auto;
}

.player-item {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.player-item:last-child {
  border-bottom: none;
}
</style>
