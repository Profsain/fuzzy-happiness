import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// base url
const baseUrl = process.env.BASE_URL;

const initialState = {
  events: [],
  status: 'idle',
  error: null,
};

// Thunk to fetch user events
export const fetchUserEvents = createAsyncThunk(
  'events/fetchUserEvents',
  async (userId) => {
    try {
      const response = await fetch(`${baseUrl}/event/user-events/${userId}`);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data.events;
    } catch (error) {
      throw new Error(error.message);
    }
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
