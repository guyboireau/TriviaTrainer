// Import the functions you need from the SDKs you need
/* eslint-disable */
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC205N_DRMeISzBEEm0E_ggyNbDuP9JSuo",
  authDomain: "web-avancefront.firebaseapp.com",
  projectId: "web-avancefront",
  storageBucket: "web-avancefront.appspot.com",
  messagingSenderId: "827309773890",
  appId: "1:827309773890:web:5a9eaf3f3018b6f77649db",
  measurementId: "G-9R4773E5JZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); 
const db = getFirestore(app);
const user = auth.currentUser;
const playersCollection = collection(db, 'usertrivial')


export default {app, analytics, auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, user, playersCollection};