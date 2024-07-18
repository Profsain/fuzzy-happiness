import { configureStore } from '@reduxjs/toolkit';
import openScreenReducer from './openScreenSlice';
import eventSlice from './eventSlice';
import fetchUserByIdSlice from './fetchUsersByIdSlice';

const store = configureStore({
  reducer: {
    openScreens: openScreenReducer,
    events: eventSlice,
    users: fetchUserByIdSlice,
  },
});

export default store;