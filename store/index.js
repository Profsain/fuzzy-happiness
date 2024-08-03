import { configureStore } from '@reduxjs/toolkit';
import openScreenReducer from './openScreenSlice';
import eventSlice from './eventSlice';
import walletSlice from './walletSlice';
import fetchUserByIdSlice from './fetchUsersByIdSlice';

const store = configureStore({
  reducer: {
    openScreens: openScreenReducer,
    events: eventSlice,
    wallet: walletSlice,
    users: fetchUserByIdSlice,
  },
});

export default store;