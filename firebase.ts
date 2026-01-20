
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCgD8meryGoumODDNQ3tuEJZux-5rAcNSc",
  authDomain: "restaurant-8ea16.firebaseapp.com",
  projectId: "restaurant-8ea16",
  storageBucket: "restaurant-8ea16.firebasestorage.app",
  messagingSenderId: "475541519677",
  appId: "1:475541519677:web:a2caa4e048085b4a0f1954",
  measurementId: "G-37E1VJWQ55"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
