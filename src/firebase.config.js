// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyB1n_WjA4VtcFFUIlF-zZZZPgqbRg8ohlE",
  authDomain: "house-hunter-5e5ce.firebaseapp.com",
  projectId: "house-hunter-5e5ce",
  storageBucket: "house-hunter-5e5ce.appspot.com",
  messagingSenderId: "747293056462",
  appId: "1:747293056462:web:261be3fb1c4bb911d0df9f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()