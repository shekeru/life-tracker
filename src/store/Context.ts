import * as Store from './Store';
import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA3Bji8Hii9jx-TohzWrQVKg1ruLaQ4UwM",
    authDomain: "life-tracker-react.firebaseapp.com",
    projectId: "life-tracker-react",
    storageBucket: "life-tracker-react.appspot.com",
    messagingSenderId: "923625287207",
    appId: "1:923625287207:web:7cb1310dd7afed19276802",
    measurementId: "G-BG4R24E25W"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();
export const auth = firebase.auth();