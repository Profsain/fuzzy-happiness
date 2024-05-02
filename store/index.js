import { configureStore } from '@reduxjs/toolkit';
import openScreenReducer from './openScreenSlice';

const store = configureStore({
  reducer: {
    openScreens: openScreenReducer,
  },
});

export default store;