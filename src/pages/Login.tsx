import React from 'react'
import { useDispatch } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { FirebaseContext } from '../store/Context'
import * as User from '../store/User'

export function LoginPage() {
    const dispatch = useDispatch()
    return (<>
        <FirebaseContext.Consumer>
            {firebase => {
                return (<div id="firebaseui"></div>);
            }}
        </FirebaseContext.Consumer>
    </>);
}