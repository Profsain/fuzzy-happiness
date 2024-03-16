// store/toggleSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  openAllGroup: false,
  openGroupDetails: false,
  openTransactionScreen: false,
  openCreateNewBill: false,
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
  },
});

export const { toggleOpenAllGroup, toggleOpenGroupDetails, toggleOpenTransactionScreen, toggleOpenCreateNewBill } = openScreenSlice.actions;
export default openScreenSlice.reducer;
