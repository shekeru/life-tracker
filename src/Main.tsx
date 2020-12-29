import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import './styles/application.sass';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import {createAppStore} from './store/Store';
import { FireBase, FirebaseContext } from './store/Context';
import * as User from './store/User';
import {App} from './web/App'; 

const FireBaseVal = new FireBase(), store = createAppStore();
    FireBaseVal.auth.onAuthStateChanged(userAuth => store.dispatch(User.Slice.actions.update(userAuth)))
const MOUNT_NODE = document.getElementById('root') as HTMLElement;

ReactDOM.render(
    <Provider store={store}>
        <HelmetProvider>
            <React.StrictMode>
                <FirebaseContext.Provider value={FireBaseVal}>
                    <App />
                </FirebaseContext.Provider>,
            </React.StrictMode>
        </HelmetProvider>
    </Provider>,
    MOUNT_NODE,
);