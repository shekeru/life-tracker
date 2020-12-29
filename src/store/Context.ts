import React from 'react';
import * as Store from './Store';
import * as firebaseui from 'firebaseui'
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
}

const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ], callbacks: {
        signInSuccessWithAuthResult: (val) => false,
    }
}

// Initialize Firebase
export class FireBase {
    auth: firebase.auth.Auth;
    ui: firebaseui.auth.AuthUI;
    firestore: firebase.firestore.Firestore;
    constructor() {
        firebase.initializeApp(firebaseConfig);
        (this.auth = firebase.auth()).setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        this.firestore = firebase.firestore(); this.loginForm();
    }
    loginForm () {
        this.ui = new firebaseui.auth.AuthUI(this.auth);
        this.ui.start('#firebaseui', uiConfig);
    }
    loadPanels (updateFn) {
        if(this.auth.currentUser)
            this.firestore.collection("users").doc(this.auth.currentUser?.uid).get().then(val => updateFn(val.data()))
    }
    savePanels (data) {
        if(this.auth.currentUser)
            this.firestore.collection("users").doc(this.auth.currentUser?.uid).set(data)
    }
}

export const FirebaseContext = React.createContext({} as FireBase);