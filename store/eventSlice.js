import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

  // base url
  const baseUrl = process.env.BASE_URL;

const initialState = {
  events: [],
  status: 'idle',
  error: null,
};

export const fetchUserEvents = createAsyncThunk(
  'events/fetchUserEvents',
  async (userId) => {
    const response = await axios.get(`${baseUrl}/event/user-events/${userId}`);
    return response.data.events;
  }
);

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserEvents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.events = action.payload;
      })
      .addCase(fetchUserEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default eventsSlice.reducer;
