import 'firebase/compat/firestore';
import firebase from "firebase/compat/app";

const firebaseConfig = {
  apiKey: "AIzaSyDawMdjId9JVEl20aK89241_W_RqEgno_Q",
  authDomain: "cart-78c59.firebaseapp.com",
  projectId: "cart-78c59",
  storageBucket: "cart-78c59.appspot.com",
  messagingSenderId: "679928964884",
  appId: "1:679928964884:web:5a2612201fb9a94d470401",
  measurementId: "G-4PMEFQ7EXS"
};

// Initialize Firebase
 firebase.initializeApp(firebaseConfig);

 export const firestore = firebase.firestore();