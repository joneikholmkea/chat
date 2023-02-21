import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import { initializeApp } from "firebase/app";

export const firebaseConfig = {
    apiKey: "AIzaSyDGPsJGvPaJvjHSFKhhg9RTiEhAq-SHv7k",
    authDomain: "firedemo-b1124.firebaseapp.com",
    databaseURL: "https://firedemo-b1124.firebaseio.com",
    projectId: "firedemo-b1124",
    storageBucket: "firedemo-b1124.appspot.com",
    messagingSenderId: "1035991261669",
    appId: "1:1035991261669:web:f6810a8434ecce529b4f0c",
    measurementId: "G-13W6TBRF51"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export default firebase