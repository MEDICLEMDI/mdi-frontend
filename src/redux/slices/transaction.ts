import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useAppSelector } from '../hooks';

// ICP 토큰 거래 내역을 조회하는 API 호출
export const fetchIcpTokenTransactions = createAsyncThunk(
  'icpTokenTransactions/fetchIcpTokenTransactions',
  async (params, thunkAPI) => {
    const { currentWallet } = useAppSelector(state => state.keyring);
    const { principal } = currentWallet || {};
    const url = `https://api.dfxplorer.com/v1/transaction?to=${principal}&token=${tokenAddress}`;
    const response = await axios.get(url);
    return response.data;
  }
);

// 초기 상태 정의
const initialState = {
  transactions: [],
  status: 'idle',
  error: null,
};

// Slice 생성
const icpTokenTransactionsSlice = createSlice({
  name: 'icpTokenTransactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // API 호출 시작
    builder.addCase(fetchIcpTokenTransactions.pending, (state) => {
      state.status = 'loading';
    });

    // API 호출 성공
    builder.addCase(fetchIcpTokenTransactions.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.transactions = action.payload;
    });

    // API 호출 실패
    builder.addCase(fetchIcpTokenTransactions.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export default icpTokenTransactionsSlice.reducer;

// Slice 내보내기
export const selectIcpTokenTransactions = (state) =>
  state.icpTokenTransactions.transactions;
export const selectIcpTokenTransactionsStatus = (state) =>
  state.icpTokenTransactions.status;
export const selectIcpTokenTransactionsError = (state) =>
  state.icpTokenTransactions.error;