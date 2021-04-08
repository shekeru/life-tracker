import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'styles/application.sass';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import {createAppStore} from 'store/Store';
import { FireBase, FirebaseContext } from 'store/Context';
import * as CtxMenu from 'store/CtxMenu'
import * as User from 'store/User';
import {App} from 'web/App'; 

const ClientFB = new FireBase()
const store = createAppStore(ClientFB);
const MOUNT_NODE = document.getElementById('root') as HTMLElement;
// Hide Context Menu
MOUNT_NODE.addEventListener('click', (ev: MouseEvent) => {
    store.dispatch(CtxMenu.Slice.actions.toggle(false))
})
MOUNT_NODE.addEventListener('contextmenu', (ev: MouseEvent) => {
    ev.preventDefault()
    store.dispatch(CtxMenu.Slice.actions.toggle(false))
})

ReactDOM.render(
    <Provider store={store}>
        <HelmetProvider>
            <React.StrictMode>
                <FirebaseContext.Provider value={ClientFB}>
                    <App />
                </FirebaseContext.Provider>
            </React.StrictMode>
        </HelmetProvider>
    </Provider>,
    MOUNT_NODE,
);