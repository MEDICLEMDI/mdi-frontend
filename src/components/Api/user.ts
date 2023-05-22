import { get, post } from "@/utils/api"

export const updateMarketingFlag = async (marketingAgree: boolean) => {
    const { data } = await post({ url: '/profile/edit/marketingAgree', body: {agreement: marketingAgree}});
    return data;
}