// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import visasReducer from './slices/visasSlice';
import searchReducer from './slices/searchSlice';
import authReducer from './slices/authSlice'
import serviceReducer from './slices/serviceSlice'
import pictureReducer from './slices/pictureSlice'
import completeReducer from './slices/completeSlice'
import appsReducer from './slices/appsSlice'

const store = configureStore({
  reducer: {
    visas: visasReducer,
    search: searchReducer,
    auth: authReducer,
    service: serviceReducer,
    images: pictureReducer,
    requests: completeReducer,
    apps: appsReducer
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;