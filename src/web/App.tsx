import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { IndexPage } from '../pages/Index'
import { ForceLogin, LoginPage } from '../pages/Login'


export function App() {
    return (
        <BrowserRouter>
            <Helmet
                defaultTitle = "Life Tracker"
                titleTemplate = "%s - Life Tracker"
                htmlAttributes = {{lang: "en"}}
            ></Helmet>
            <Switch>
                <ForceLogin exact path = '/' component = {IndexPage} />
                <Route exact path = '/login' component={LoginPage} />
            </Switch>
        </BrowserRouter>
    );
};