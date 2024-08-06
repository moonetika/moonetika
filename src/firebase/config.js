// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
//@ts-ignore
import { getReactNativePersistence } from '@firebase/auth/dist/rn/index.js';


const firebaseConfig = {
    apiKey: "AIzaSyCOJMo28bYz7ogQAB6rxxqfpudDfj2j2D8",
    authDomain: "tucancard-61a00.firebaseapp.com",
    databaseURL: "https://tucancard-61a00-default-rtdb.firebaseio.com",
    projectId: "tucancard-61a00",
    storageBucket: "tucancard-61a00.appspot.com",
    messagingSenderId: "824103952655",
    appId: "1:824103952655:web:f65293b6fceaa248c65e7a",
    measurementId: "G-N2TXP14L3S"
  };

// Initialize Firebase (

firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);

// ////console.log(getReactNativePersistence);

initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const db = firebase.firestore();

const authentication = getAuth(app);
export { firebase, authentication, db};
