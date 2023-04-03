// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyDwivmmu5nNyxCrzD8NnWlz8IAOrftQVWo",
  authDomain: "rent-i-83edd.firebaseapp.com",
  projectId: "rent-i-83edd",
  storageBucket: "rent-i-83edd.appspot.com",
  messagingSenderId: "655885636516",
  appId: "1:655885636516:web:7ce235e0f238b89bcee731",
  measurementId: "G-NTMEY704P7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore() 