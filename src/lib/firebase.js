// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: "nccformation-8e052",
  storageBucket: "nccformation-8e052.firebasestorage.app",
  messagingSenderId: "778629381126",
  appId: "1:778629381126:web:0c5232f5b69f1aa13f5787"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);