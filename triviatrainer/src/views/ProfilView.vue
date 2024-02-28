<template>
    <div class="profile">
        <h1>Profil</h1>
        <div>
            <p><strong>Nom:</strong> {{ user.displayName || 'Non défini' }}</p>
            <p><strong>Email:</strong> {{ user.email }}</p>
            <p><strong>Score:</strong> {{ user.score }}</p>
            <p><strong>Classement:</strong> {{ userRank }}e</p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getAuth } from 'firebase/auth'
import { collection, getDoc, doc, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '@/firebase/firebase'

export default defineComponent({
  data () {
    return {
      user: {
        displayName: '',
        email: '',
        score: 0
      },
      userRank: 0
    }
  },
  async created () {
    const auth = getAuth()
    const currentUser = auth.currentUser
    console.log('Current user:', currentUser.uid)
    if (currentUser) {
      this.user.email = currentUser.email || ''
      await this.getUserScore(currentUser.uid)
      await this.getUserRank(currentUser.uid)
    }
  },
  methods: {
    async getUserScore (userId: string) {
      try {
        const userDocRef = doc(collection(db, 'usertrivial'), userId)
        const userDocSnapshot = await getDoc(userDocRef)
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data()
          if (userData) {
            this.user.displayName = userData.name || ''
            this.user.score = userData.score || 0
          }
        } else {
          console.log('User document not found in Firestore')
        }
      } catch (error) {
        console.error('Error fetching user score:', error)
      }
    },
    async getUserRank (userId: string) {
      try {
        const usersCollection = collection(db, 'usertrivial')
        const querySnapshot = await getDocs(query(usersCollection, orderBy('score', 'desc')))
        const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        const userIndex = users.findIndex(user => user.id === userId)
        if (userIndex !== -1) {
          this.userRank = userIndex + 1 // Index + 1 car les indices commencent à 0
        }
      } catch (error) {
        console.error('Error fetching user rank:', error)
      }
    }
  }
})
</script>

<style scoped>
.profile {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
}

.profile h1 {
  text-align: center;
  margin-bottom: 20px;
}

.profile div {
  margin-top: 20px;
}

.profile p {
  margin-bottom: 10px;
}

.profile strong {
  font-weight: bold;
}
</style>
