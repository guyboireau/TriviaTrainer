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
import {
  collection, onSnapshot,
  addDoc, doc, deleteDoc, updateDoc,
  query, orderBy, getDocs
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
