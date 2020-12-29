import React from 'react'
import { useDispatch } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import * as User from '../store/User'
import * as firebaseui from 'firebaseui'
import firebase from 'firebase/app'

export function ForceLogin(props) {
    let user = User.Select()
    if(!user.uid)
        return (<Redirect to="/login"></Redirect>)
    return (<Route path={props.path} exact component={props.component} />)
}

export function LoginPage() {
    const dispatch = useDispatch()
    return (
        <>
           <div id="firebaseui"></div>
        </>
    );
}

var uiConfig = {
    signInSuccessUrl: '/',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ]
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui', uiConfig);