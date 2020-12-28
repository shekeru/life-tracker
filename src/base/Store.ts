import { configureStore } from '@reduxjs/toolkit';

export const createAppStore = () =>
    configureStore({
        reducer: () => {},
        devTools: 
            process.env.NODE_ENV !== 'production' ||
            (process.env.PUBLIC_URL || "").length > 0,
    })