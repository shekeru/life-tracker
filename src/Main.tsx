import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import './styles/application.sass';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import {createAppStore} from './web/Store';
import {App} from './web/App'; 

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