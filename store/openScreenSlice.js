// store/toggleSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  openAllGroup: false,
  openGroupDetails: false,
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
  },
});

export const { toggleOpenAllGroup, toggleOpenGroupDetails } = openScreenSlice.actions;
export default openScreenSlice.reducer;
