import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// base URL
const baseUrl = process.env.BASE_URL;

const initialState = {
  wallet: {},
  status: 'idle',
  error: null,
};

// Thunk to fetch wallet data
export const fetchWallet = createAsyncThunk(
  'wallet/fetchWallet',
  async (userId) => {
    try {
      const response = await fetch(`${baseUrl}/wallet/get-wallet/${userId}`);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data;  // Return the wallet data
    } catch (error) {
      throw new Error(error.message);  // Propagate the error
    }
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
