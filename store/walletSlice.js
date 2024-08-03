import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

  // base url
  const baseUrl = process.env.BASE_URL;
  

const initialState = {
  wallet: {},
  status: 'idle',
  error: null,
};

export const fetchWallet = createAsyncThunk(
  'events/fetchWallet',
  async (userId) => {
    const response = await axios.get(`${baseUrl}//wallet/get-wallet/${userId}`);
    return response.data;
  }
);

const walletSlice = createSlice({
  name: 'wallet',
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
