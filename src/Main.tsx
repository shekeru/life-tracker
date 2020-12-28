import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
// import 'sanitize.css/sanitize.css';
// import 'bootstrap';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import FontFaceObserver from 'fontfaceobserver';
import {createAppStore} from './Store';
import {App} from './App'; 

const openSansObserver = new FontFaceObserver('Inter', {});
// When Inter is loaded, add a font-family using Inter to the body
openSansObserver.load().then(() => {
    document.body.classList.add('fontLoaded');
});

const store = createAppStore();
const MOUNT_NODE = document.getElementById('root') as HTMLElement;

ReactDOM.render(
    <Provider store={store}>
        <HelmetProvider>
            <React.StrictMode>
                <App/>
            </React.StrictMode>
        </HelmetProvider>
    </Provider>,
    MOUNT_NODE,
);