// store/toggleSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  openAllGroup: false,
  openGroupDetails: false,
  openTransactionScreen: false,
};

const openScreenSlice = createSlice({
  name: 'openScreens',
  initialState,
  reducers: {
    toggleOpenAllGroup(state) {
      state.openAllGroup = !state.openAllGroup;
    },
    toggleOpenGroupDetails(state) {
      state.openGroupDetails = !state.openGroupDetails;
    },
    toggleOpenTransactionScreen(state) {
      state.openTransactionScreen = !state.openTransactionScreen;
    },
  },
});

export const { toggleOpenAllGroup, toggleOpenGroupDetails, toggleOpenTransactionScreen } = openScreenSlice.actions;
export default openScreenSlice.reducer;
