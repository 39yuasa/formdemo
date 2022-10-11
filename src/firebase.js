import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtS9mDjTLSXTdbJa0brGRw-IGKVLdYQuM",
  authDomain: "firestore-ebf12.firebaseapp.com",
  projectId: "firestore-ebf12",
  storageBucket: "firestore-ebf12.appspot.com",
  messagingSenderId: "237485942271",
  appId: "1:237485942271:web:2009597059593d3879f3ca",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);
export { auth };
// Import the functions you need from the SDKs you need
