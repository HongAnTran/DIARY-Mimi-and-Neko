// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAetsx0FBBf6Qyyt7Kz80A9-lP8TEzPOTc",
  authDomain: "antechsocial.firebaseapp.com",
  projectId: "antechsocial",
  storageBucket: "antechsocial.appspot.com",
  messagingSenderId: "936365300647",
  appId: "1:936365300647:web:a5c8574b3b2ac3c329b482",
  measurementId: "G-84HX3QSPSH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


export {auth,app,db,storage}