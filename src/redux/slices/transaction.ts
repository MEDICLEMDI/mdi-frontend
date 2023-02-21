import { createSlice } from '@reduxjs/toolkit';

import { TransactionsState } from '@/interfaces/redux';

const initialState: TransactionsState = {
  transactions: [],
  loading: false,
  error: '',
};

const slice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    fetchTransactionsStart(state) {
      state.loading = true;
    },
    fetchTransactionsSuccess(state, action) {
      state.loading = false;
      state.transactions = action.payload;
    },
    fetchTransactionsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default slice.reducer;
export const {
  fetchTransactionsStart,
  fetchTransactionsSuccess,
  fetchTransactionsFailure,
} = slice.actions;
