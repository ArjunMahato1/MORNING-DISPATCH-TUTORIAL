// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "morning-dispatch-ef9e4.firebaseapp.com",
  projectId: "morning-dispatch-ef9e4",
  storageBucket: "morning-dispatch-ef9e4.firebasestorage.app",
  messagingSenderId: "496169624674",
  appId: "1:496169624674:web:90f34ac2e748ebbd799d3b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);