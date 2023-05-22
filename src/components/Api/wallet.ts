import { get, post } from "@/utils/api"

export const getBalance = async (id: number, wallet: string) => {
    const { data } = await get(`/wallet/getBalance/${id}/${wallet}`, true);
    return data;
}

export const transfer = async (data: {
    id: number;
    from: string;
    to: string;
    amount: number;
    type: number;
}) => {
    return await post({ url: `/wallet/transfer`, body: {
        user_idx: data.id,
        wallet_address: data.from,
        to: data.to,
        amount: data.amount.toString(),
        token_type: data.type.toString(),
    } });
}

export const getDepositHistory = async (id: number, wallet: string, page: number) => {
    return await get(`/wallet/getDepositHistory/${id}/${wallet}/${page}`, true);
}

export const getWithdawHistory = async (id: number, wallet: string, page: number) => {
    return await get(`/wallet/getWithdawHistory/${id}/${wallet}/${page}`, true);
}