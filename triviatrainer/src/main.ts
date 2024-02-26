import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { auth } from './firebase/firebase'

createApp(App)
  .use(router)
  .use(auth)
  .mount('#app')

// auth.onAuthStateChanged((user) => {
//   // Mettre à jour l'état de l'application en fonction de l'état de l'authentification
// })
