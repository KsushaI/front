// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import visasReducer from './slices/visasSlice';
import searchReducer from './slices/searchSlice';

const store = configureStore({
  reducer: {
    visas: visasReducer,
    search: searchReducer
  },
});

export default store;