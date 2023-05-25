import { ITxHistory, ITxId, IWallet, ResponseDTO } from '@/interfaces/api';
import { get, post } from '@/utils/api';

/**
 * 블록체인 지갑 잔액조회
 * @param id
 * @param wallet
 * @returns IWallet
 */
export const getBalance = async (
  id: number,
  wallet: string
): Promise<IWallet> => {
  const { data } = await get(`/wallet/getBalance/${id}/${wallet}`, true);
  return data;
};

/**
 * 블록체인 트랜잭션 전송
 * @param data
 * @returns
 */ Promise<ResponseDTO<ITxId>>;
export const transfer = async (data: {
  id: number;
  from: string;
  to: string;
  amount: number;
  type: number;
}): Promise<ResponseDTO<ITxId>> => {
  return await post({
    url: `/wallet/transfer`,
    body: {
      user_idx: data.id,
      wallet_address: data.from,
      to: data.to,
      amount: data.amount.toString(),
      token_type: data.type.toString(),
    },
  });
};

/**
 * 블록체인 입금받은 트랜잭션리스트
 * @param id
 * @param wallet
 * @param page
 * @returns Promise<ResponseDTO<ITxHistory[]>>
 */
export const getDepositHistory = async (
  id: number,
  wallet: string,
  page: number
): Promise<ResponseDTO<ITxHistory[]>> => {
  return await get(`/wallet/getDepositHistory/${id}/${wallet}/${page}`, true);
};

/**
 * 블록체인 출금한 트랜잭션리스트
 * @param id
 * @param wallet
 * @param page
 * @returns : Promise<ResponseDTO<ITxHistory[]>>
 */
export const getWithdawHistory = async (
  id: number,
  wallet: string,
  page: number
): Promise<ResponseDTO<ITxHistory[]>> => {
  return await get(`/wallet/getWithdawHistory/${id}/${wallet}/${page}`, true);
};
