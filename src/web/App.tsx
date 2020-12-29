import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FirebaseContext } from '../store/Context';

import { IndexPage } from '../pages/Index'
import { LoginPage } from '../pages/Login'
import * as User from '../store/User'


export function App() {
    let user = User.Select()
    return (<>
        <Helmet
            defaultTitle = "Life Tracker"
            titleTemplate = "%s - Life Tracker"
            htmlAttributes = {{lang: "en"}}
        ></Helmet>
        <FirebaseContext.Consumer>
            {firebase => firebase.auth.currentUser ?
                (<IndexPage />) : (<LoginPage />)
            }
        </FirebaseContext.Consumer>
    </>);
};