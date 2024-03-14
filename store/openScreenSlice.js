// store/toggleSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  openAllGroup: false,
};

const openScreenSlice = createSlice({
  name: 'openScreens',
  initialState,
  reducers: {
    toggleOpenAllGroup(state) {
      state.openAllGroup = !state.openAllGroup;
    },
  },
});

export const { toggleOpenAllGroup } = openScreenSlice.actions;
export default openScreenSlice.reducer;
