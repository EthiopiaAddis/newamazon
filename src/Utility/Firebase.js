// src/utility/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAnd5ToBwOS3wBk_7q6qdipI2X48bzJ87g",
  authDomain: "clone-5d2cf.firebaseapp.com",
  projectId: "clone-5d2cf",
  storageBucket: "clone-5d2cf.appspot.com",
  messagingSenderId: "129625560424",
  appId: "1:129625560424:web:2c29d2eb538134d4af72dd",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
