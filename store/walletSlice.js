import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// base URL
const baseUrl = process.env.BASE_URL; 

const initialState = {
  wallet: {},
  status: 'idle',
  error: null,
};

export const fetchWallet = createAsyncThunk(
  'wallet/fetchWallet', // Updated to match the slice name
  async (userId) => {
    const response = await axios.get(`${baseUrl}/wallet/get-wallet/${userId}`);
    alert("id", userId);
    return response;
  }
);

const walletSlice = createSlice({
  name: 'wallet', // Updated to match the thunk name
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWallet.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWallet.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.wallet = action.payload;
      })
      .addCase(fetchWallet.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default walletSlice.reducer;
