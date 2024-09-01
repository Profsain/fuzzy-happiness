// store/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Create an async thunk for fetching users by IDs
export const fetchUsersByIds = createAsyncThunk(
  'users/fetchByIds',
  async (userIds) => {
    const response = await fetch(`${process.env.BASE_URL}/user/fetch-users-info`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userIds }),
    });

      if (!response.ok) {
      throw new Error(JSON.stringify(response));
    }

    const data = await response.json();
    return data.users; // Assuming the response contains the user array
  }
);

// Create the user slice
const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersByIds.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsersByIds.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add the fetched users to the state
        state.users = action.payload;
      })
      .addCase(fetchUsersByIds.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});


// Export the selector to get users from the state
export const selectAllUsers = (state) => state.users.users;

// Export the reducer to be used in the store
export default userSlice.reducer;
