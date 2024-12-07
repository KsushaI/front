// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import visasReducer from './slices/visasSlice';
import searchReducer from './slices/searchSlice';
import authReducer from './slices/authSlice'
import serviceReducer from './slices/serviceSlice'

const store = configureStore({
  reducer: {
    visas: visasReducer,
    search: searchReducer,
    auth: authReducer,
    service: serviceReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;