import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

export function App() {
    return (
        <BrowserRouter>
            <Helmet
                defaultTitle = "Life Tracker"
                titleTemplate = "%s - Life Tracker"
                htmlAttributes = {{lang: "en"}}
            ></Helmet>
            <Switch>
            </Switch>
            "Hello World!"
        </BrowserRouter>
    );
};