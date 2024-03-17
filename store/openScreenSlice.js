// store/toggleSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  openAllGroup: false,
  openGroupDetails: false,
  openTransactionScreen: false,
  openCreateNewBill: false,
  openTransactionHistory: false,
  openTopUpScreen: false,
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
    toggleOpenCreateNewBill(state) {
      state.openCreateNewBill = !state.openCreateNewBill;
    },
    toggleOpenTransactionHistory(state) {
      state.openTransactionHistory = !state.openTransactionHistory;
    },
    toggleOpenTopUpScreen(state) {
      state.openTopUpScreen = !state.openTopUpScreen;
    },
  },
});

export const { toggleOpenAllGroup, toggleOpenGroupDetails, toggleOpenTransactionScreen, toggleOpenCreateNewBill, toggleOpenTransactionHistory, toggleOpenTopUpScreen } = openScreenSlice.actions;

export default openScreenSlice.reducer;
