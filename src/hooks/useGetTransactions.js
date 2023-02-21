import axios from 'axios';

import { useAppDispatch } from '@/redux/hooks';
import {
  fetchTransactionsFailure,
  fetchTransactionsStart,
  fetchTransactionsSuccess,
} from '@/redux/slices/transaction';

export const fetchTransactions = (mdiCanisterId, principalId) => {
  return async dispatch => {
    try {
      dispatch(fetchTransactionsStart());
      const apiEndpoint = `https://ic-api.internetcomputer.org/api/`;
      const path = `v1/${principalId}/h4gr6-maaaa-aaaap-aassa-cai/transactions`;
      const response = await fetch(apiEndpoint + path);
      console.log('리스폰스' + response);
      const data = await response.json();
      console.log(data);

    //   dispatch(fetchTransactionsSuccess(transactions));
    } catch (error) {
      console.log('트랜잭션실패');
      dispatch(fetchTransactionsFailure(error.message));
    }
  };
};
