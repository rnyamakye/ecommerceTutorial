// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDQsKqFOUpcmhy2sjNGnkq6IvY601sb5Lw",
  authDomain: "ecommerce-tutorial-817f2.firebaseapp.com",
  projectId: "ecommerce-tutorial-817f2",
  storageBucket: "ecommerce-tutorial-817f2.firebasestorage.app",
  messagingSenderId: "903653247309",
  appId: "1:903653247309:web:5c6fbf7505de32e8c24f04",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
