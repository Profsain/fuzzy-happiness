// store/toggleSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  openAllGroup: false,
  openGroupDetails: false,
  openTransactionScreen: false,
  openCreateNewBill: false,
  openTransactionHistory: false,
  openTopUpScreen: false,
  openTransferScreen: false,
  openRequestScreen: false,
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
    toggleOpenTransferScreen(state) {
      state.openTransferScreen = !state.openTransferScreen;
    },
    toggleOpenRequestScreen(state) {
      state.openRequestScreen = !state.openRequestScreen;
    },
  },
});

export const { toggleOpenAllGroup, toggleOpenGroupDetails, toggleOpenTransactionScreen, toggleOpenCreateNewBill, toggleOpenTransactionHistory, toggleOpenTopUpScreen, toggleOpenTransferScreen, toggleOpenRequestScreen } = openScreenSlice.actions;

export default openScreenSlice.reducer;
